"use client";

import { useMemo, useState } from "react";
import CalculatorShell from "@/app/components/calculatorshell";

const buttons = [
  ["AC", "DEL", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["±", "0", ".", "="]
];

function safeEvaluate(expression: string) {
  const normalized = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/%/g, "/100");

  if (!/^[0-9.+\-*/() ]+$/.test(normalized)) return "Error";

  try {
    // eslint-disable-next-line no-new-func
    const value = new Function(`"use strict"; return (${normalized})`)();
    if (typeof value === "number" && Number.isFinite(value)) {
      return Math.round((value + Number.EPSILON) * 100000000) / 100000000;
    }
    return "Error";
  } catch {
    return "Error";
  }
}

function toggleSign(expression: string) {
  const match = expression.match(/(-?\d*\.?\d+)$/);
  if (!match) return expression;
  const number = match[1];
  const negated = number.startsWith("-") ? number.slice(1) : `-${number}`;
  return expression.slice(0, match.index) + negated;
}

export default function MathsCalculator() {
  const [expression, setExpression] = useState("0");

  const result = useMemo(() => {
    if (expression === "" || expression === "0") return "0";
    const evaluated = safeEvaluate(expression);
    return evaluated === "Error" ? "" : String(evaluated);
  }, [expression]);

  const handleButton = (value: string) => {
    if (value === "AC") {
      setExpression("0");
      return;
    }

    if (value === "DEL") {
      setExpression((prev) => {
        const next = prev.slice(0, -1);
        return next === "" ? "0" : next;
      });
      return;
    }

    if (value === "=") {
      const evaluated = safeEvaluate(expression);
      setExpression(evaluated === "Error" ? "0" : String(evaluated));
      return;
    }

    if (value === "±") {
      setExpression((prev) => toggleSign(prev));
      return;
    }

    setExpression((prev) => {
      if (prev === "0" && value !== ".") return value;
      const last = prev.slice(-1);
      const isOperator = /[+\-×÷*/]/.test(last);
      const isNewOperator = /[+\-×÷]/.test(value);

      if (isOperator && isNewOperator) {
        return prev.slice(0, -1) + value;
      }

      if (value === ".") {
        const parts = prev.split(/[+\-×÷]/);
        if (parts[parts.length - 1].includes(".")) return prev;
      }

      return prev + value;
    });
  };

  return (
    <CalculatorShell title="Calculator">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] mb-6">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 text-right shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="min-h-[3rem] break-words text-2xl font-medium text-slate-700 dark:text-slate-100">{expression}</div>
            <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">Result</div>
            <div className="text-4xl font-semibold text-slate-900 dark:text-white">{result}</div>
          </div>

          <div className="mt-6 grid gap-3 grid-cols-4">
            {buttons.flat().map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleButton(label)}
                className={`rounded-3xl py-4 text-xl font-semibold transition ${
                  label === "AC" || label === "DEL"
                    ? "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100"
                    : /[+\-×÷=]/.test(label)
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="calc-stat-card">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Quick operations</p>
            <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">Tap the grid to build calculations. Use “AC” to reset or “DEL” to remove the last entry.</p>
          </div>
          <div className="calc-accent-card">
            <p className="text-sm uppercase tracking-[0.2em] text-teal-700">Tips</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>Use × and ÷ for multiplication and division.</li>
              <li>Press = to evaluate the expression.</li>
              <li>Percent converts the current value to /100.</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorShell>
  );
}
