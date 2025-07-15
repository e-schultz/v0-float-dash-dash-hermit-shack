import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import { TaskItem } from "@/components/task-item"
import { MetadataTag } from "@/components/metadata-tag"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default components
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>,

    // Custom components
    img: (props) => <Image sizes="100vw" style={{ width: "100%", height: "auto" }} {...props} alt={props.alt || ""} />,

    // You can add custom components that can be used in MDX
    TaskItem,
    MetadataTag,

    ...components,
  }
}
