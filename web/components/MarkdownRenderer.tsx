import React from "react";
import Markdown from "markdown-to-jsx";

interface MarkdownRendererProps {
  children: string;
}

// Explicitly type the Markdown component's props
const MarkdownComponent = Markdown as React.ComponentType<{
  children: string;
  options?: unknown;
}>;

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ children }) => {
  return (
    <MarkdownComponent
      options={{
        // Force all elements to inherit base styles unless explicitly overridden
        overrides: {
          // Headings
          h1: {
            component: "h1",
            props: { className: "text-4xl font-bold my-4" },
          },
          h2: {
            component: "h2",
            props: { className: "text-3xl font-bold my-4" },
          },
          h3: {
            component: "h3",
            props: { className: "text-2xl font-bold my-3" },
          },
          // Paragraphs
          p: {
            component: "p",
            props: { className: "mb-4 text-base leading-relaxed" },
          },
          // Bold text
          strong: {
            component: "strong",
            props: { className: "font-semibold" },
          },
          // Lists
          ul: {
            component: "ul",
            props: { className: "list-disc list-inside pl-4 space-y-2 my-2" },
          },
          ol: {
            component: "ol",
            props: {
              className: "list-decimal list-inside pl-4 space-y-2 my-2",
            },
          },
          li: {
            component: "li",
            props: { className: "pl-2" },
          },
          // Links
          a: {
            component: "a",
            props: {
              className: "text-blue-600 hover:underline",
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        },
      }}
    >
      {children}
    </MarkdownComponent>
  );
};

export default MarkdownRenderer;
