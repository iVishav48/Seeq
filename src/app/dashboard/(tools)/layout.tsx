export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center min-h-[90vh] justify-center">
            {children}
        </div>
    )
}