"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div className={`prose prose-sm max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className: codeClass, children, ...props }) {
            const match = /language-(\w+)/.exec(codeClass || "");
            const code = String(children).replace(/\n$/, "");
            const inline = !match && !code.includes("\n");

            if (inline) {
              return (
                <code
                  className="rounded bg-surface-overlay px-1.5 py-0.5 font-mono text-[0.85em] text-emerald-600 dark:text-emerald-300"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match?.[1] ?? "text"}
                PreTag="div"
                customStyle={{
                  margin: "0.75rem 0",
                  borderRadius: "0.5rem",
                  fontSize: "0.8rem",
                  border: "1px solid #2f2f2f",
                }}
              >
                {code}
              </SyntaxHighlighter>
            );
          },
          table({ children }) {
            return (
              <div className="my-3 overflow-x-auto rounded-lg border border-surface-border">
                <table className="w-full text-left text-sm">{children}</table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="border-b border-surface-border bg-surface-overlay px-3 py-2 font-medium">
                {children}
              </th>
            );
          },
          td({ children }) {
            return <td className="border-b border-surface-border/50 px-3 py-2">{children}</td>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-accent pl-4 text-zinc-400">
                {children}
              </blockquote>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                className="text-accent underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
