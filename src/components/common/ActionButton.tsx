const ActionButton = ({
    label,
    onClick,
    icon: Icon,
    className = '',
    disabled = false,
    iconOnlyOnMobile = false
}: {
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    className?: string;
    disabled?: boolean;
    iconOnlyOnMobile?: boolean;
}) => {
    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                className={`${className}`}
                onClick={onClick}
                disabled={disabled}
            >
                {Icon && <Icon aria-hidden="true" className="m-0 lg:-ml-0.5 lg:mr-1.5 mr-1 size-5 text-[var(--background)] dark:text-[var(--foreground)]" />}
                {iconOnlyOnMobile ? <span className='hidden sm:block'>{label}</span> : label}
            </button>
        </div>
    );
}
export default ActionButton;

// Usage example:
// <ActionBtton
//   label="Go Back"
//   onClick={() => router.back()}
//   icon={ArrowUturnLeftIcon}
//   className="bg-blue-500 text-white hover:bg-blue-600"
//   disabled={false}
// />