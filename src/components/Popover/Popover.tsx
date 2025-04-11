// // components/UserActionsPopover.tsx
// import * as Popover from '@radix-ui/react-popover';
// import clsx from 'clsx';
// import { Button } from '../Button/Button';
// import Delete from '../../assets/deleteUser.svg'
//
// export function UserActionsPopover() {
//     return (
//         <Popover.Root>
//             <Popover.Trigger asChild>
//                 <Button variant="ghost" size="icon">
//                 </Button>
//             </Popover.Trigger>
//
//             <Popover.Portal>
//                 <Popover.Content
//                     align="end"
//                     sideOffset={8}
//                     className="rounded-xl shadow-md bg-white border p-2 w-52 z-50"
//                 >
//                     <ActionItem icon={<Delete className="text-red-500 w-4 h-4" />} label="Удалить" />
//                     {/*<ActionItem icon={<Ban className="text-yellow-500 w-4 h-4" />} label="Забанить пользователя" />*/}
//                     {/*<ActionItem icon={<Info className="text-blue-500 w-4 h-4" />} label="Больше информации" />*/}
//                 </Popover.Content>
//             </Popover.Portal>
//         </Popover.Root>
//     );
// }
//
// function ActionItem({
//                         icon,
//                         label,
//                         onClick,
//                     }: {
//     icon: React.ReactNode;
//     label: string;
//     onClick?: () => void;
// }) {
//     return (
//         <button
//             onClick={onClick}
//             className={clsx(
//                 'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors'
//             )}
//         >
//             {icon}
//             <span>{label}</span>
//         </button>
//     );
// }


