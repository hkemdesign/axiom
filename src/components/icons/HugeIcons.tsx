import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const defaultProps = {
  width: 18,
  height: 18,
  strokeWidth: 1.6,
  stroke: 'currentColor',
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const DocumentIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M4 6C4 4.89543 4.89543 4 6 4H14.1716C14.702 4 15.2107 4.21071 15.5858 4.58579L19.4142 8.41421C19.7893 8.78929 20 9.29799 20 9.82843V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4.89543 19.1046 4 18V6Z" />
    <path d="M14 4V8C14 8.55228 14.4477 9 15 9H19" />
    <path d="M8 13H16" />
    <path d="M8 17H13" />
  </svg>
);

export const FolderIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M2.5 7C2.5 5.61929 3.61929 4.5 5 4.5H9.08579C9.74882 4.5 10.3847 4.76339 10.8536 5.23223L12.1464 6.52513C12.6153 6.99396 13.2512 7.25736 13.9142 7.25736H19C20.3807 7.25736 21.5 8.37665 21.5 9.75736V17C21.5 18.3807 20.3807 19.5 19 19.5H5C3.61929 19.5 2.5 18.3807 2.5 17V7Z" />
  </svg>
);

export const ServerIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="3" y="4" width="18" height="6" rx="2" />
    <rect x="3" y="14" width="18" height="6" rx="2" />
    <circle cx="7" cy="7" r="1" fill="currentColor" />
    <circle cx="7" cy="17" r="1" fill="currentColor" />
    <path d="M14 7H17" />
    <path d="M14 17H17" />
  </svg>
);

export const DatabaseIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V5" />
    <path d="M4 12V19C4 20.66 7.58 22 12 22C16.42 22 20 20.66 20 19V12" />
  </svg>
);

export const CloudIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M6.5 19H17.5C19.9853 19 22 16.9853 22 14.5C22 12.1865 20.2523 10.2789 17.9904 10.034C17.5878 6.6433 14.7171 4 11.25 4C8.24647 4 5.68832 6.01257 4.88796 8.87784C2.69315 9.4891 1.5 11.4741 1.5 13.75C1.5 16.6495 3.85051 19 6.5 19Z" />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M12 3L4 6V11.5C4 16.5 7.5 20.8 12 22C16.5 20.8 20 16.5 20 11.5V6L12 3Z" />
    <path d="M9 12L11 14L15 10" />
  </svg>
);

export const FlowIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="6" height="6" rx="1.5" />
    <rect x="15" y="3" width="6" height="6" rx="1.5" />
    <rect x="9" y="15" width="6" height="6" rx="1.5" />
    <path d="M6 9V12C6 13.1 6.9 14 8 14H12M18 9V12C18 13.1 17.1 14 16 14H12" />
    <path d="M12 14V15" />
  </svg>
);

export const CubeIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M12 2.5L20 7.1V16.9L12 21.5L4 16.9V7.1L12 2.5Z" />
    <path d="M12 2.5V12M12 12L20 7.1M12 12L4 7.1" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M19 16L19.9 19.1L23 20L19.9 20.9L19 24L18.1 20.9L15 20L18.1 19.1L19 16Z" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M16.5 16.5L21 21" />
  </svg>
);

export const ShareIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51L15.42 17.49" />
    <path d="M15.41 6.51L8.59 10.49" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M12 5V19M5 12H19" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M6 9L12 15L18 9" />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M18 15L12 9L6 15" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M9 18L15 12L9 6" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M15 18L9 12L15 6" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M19 12H5M12 19L5 12L12 5" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M5 12H19M12 5L19 12L12 19" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M12 19V5M5 12L12 5L19 12" />
  </svg>
);

export const ArrowDownIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M12 5V19M19 12L12 19L5 12" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M4 12L9 17L20 6" />
  </svg>
);

export const CopyIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6C16 4.9 15.1 4 14 4H6C4.9 4 4 4.9 4 6V14C4 15.1 4.9 16 6 16H8" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12H22M12 2C14.5 5.5 16 8.5 16 12C16 15.5 14.5 18.5 12 22C9.5 18.5 8 15.5 8 12C8 8.5 9.5 5.5 12 2Z" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M16 18L22 12L16 6M8 6L2 12L8 18" />
  </svg>
);

export const TerminalIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M4 17L10 11L4 5M12 19H20" />
  </svg>
);

export const DragHandleIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 16} height={size || 16} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <circle cx="9" cy="6" r="1.5" fill="currentColor" />
    <circle cx="15" cy="6" r="1.5" fill="currentColor" />
    <circle cx="9" cy="12" r="1.5" fill="currentColor" />
    <circle cx="15" cy="12" r="1.5" fill="currentColor" />
    <circle cx="9" cy="18" r="1.5" fill="currentColor" />
    <circle cx="15" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

export const LockIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" />
  </svg>
);

export const UnlockIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7" />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M10 13C10.4 13.6 11 14 11.7 14.1C12.4 14.2 13.1 14 13.6 13.5L16.5 10.6C17.4 9.7 17.4 8.3 16.5 7.4C15.6 6.5 14.2 6.5 13.3 7.4L12.3 8.4" />
    <path d="M14 11C13.6 10.4 13 10 12.3 9.9C11.6 9.8 10.9 10 10.4 10.5L7.5 13.4C6.6 14.3 6.6 15.7 7.5 16.6C8.4 17.5 9.8 17.5 10.7 16.6L11.7 15.6" />
  </svg>
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ size, strokeWidth = 1.6, filled, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} {...props}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export const MoreIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M18 6L6 18M6 6L18 18" />
  </svg>
);

export const TableIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9H21M3 15H21M9 3V21M15 3V21" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" />
  </svg>
);

export const SortIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M11 5H3M15 11H3M18 17H3M17 3V13M17 13L14 10M17 13L20 10" />
  </svg>
);

export const WrapTextIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M3 6H21M3 12H17C18.6569 12 20 13.3431 20 15C20 16.6569 18.6569 18 17 18H9M9 18L12 15M9 18L12 21M3 18H5" />
  </svg>
);

export const ColumnsIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="4" y="3" width="6" height="18" rx="1.5" />
    <rect x="14" y="3" width="6" height="18" rx="1.5" />
  </svg>
);

export const PinIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M12 17V22M5 17H19L17 11V4H7V11L5 17ZM9 4H15" />
  </svg>
);

export const PinOffIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M2 2L22 22M12 17V22M9 4H15M7 11L5 17H17M17 11V4" />
  </svg>
);

export const PanelLeftClose: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3V21M14 9L11 12L14 15" />
  </svg>
);

export const PanelLeftOpen: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3V21M13 15L16 12L13 9" />
  </svg>
);

export const ListTreeIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M21 12H8M21 6H8M21 18H11M3 6V18M3 12H8M3 18H11" />
  </svg>
);

export const PaletteIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" />
    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C13.3807 22 14.5 20.8807 14.5 19.5C14.5 18.82 14.22 18.21 13.78 17.76C13.34 17.31 13.07 16.7 13.07 16.02C13.07 14.64 14.19 13.52 15.57 13.52H17.5C19.9853 13.52 22 11.5053 22 9.02C22 5.14 17.52 2 12 2Z" />
  </svg>
);

export const DuplicateIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" />
  </svg>
);

export const SmileIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14C8.75 15.5 10.25 16.5 12 16.5C13.75 16.5 15.25 15.5 16 14M9 9H9.01M15 9H15.01" />
  </svg>
);

export const Heading1Icon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M4 6V18M14 6V18M4 12H14M18 10L20 8V18" />
  </svg>
);

export const Heading2Icon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M4 6V18M12 6V18M4 12H12M17 11C17 9.89543 17.8954 9 19 9C20.1046 9 21 9.89543 21 11C21 12.8 17 14.5 17 18H21" />
  </svg>
);

export const Heading3Icon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M4 6V18M12 6V18M4 12H12M17.5 9H21L18.5 13C19.8 13 21 14 21 15.5C21 16.88 19.88 18 18.5 18C17.3 18 16.5 17.3 16 16.5" />
  </svg>
);

export const PilcrowIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M13 4V20M17 4V20M13 4H8C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12H13" />
  </svg>
);

export const SubpageIcon: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="13" height="13" rx="2" />
    <path d="M8 8H12M8 11H10M16 8V19C16 20.1 16.9 21 18 21H21M16 14H19" />
  </svg>
);

export const UserPlus: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M16 21V19C16 16.7909 14.2091 15 12 15H5C2.79086 15 1 16.7909 1 19V21" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8V14M23 11H17" />
  </svg>
);

export const ExternalLink: React.FC<IconProps> = ({ size, strokeWidth = 1.6, ...props }) => (
  <svg {...defaultProps} width={size || 18} height={size || 18} strokeWidth={strokeWidth} viewBox="0 0 24 24" {...props}>
    <path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" />
    <path d="M15 3H21V9" />
    <path d="M10 14L21 3" />
  </svg>
);
