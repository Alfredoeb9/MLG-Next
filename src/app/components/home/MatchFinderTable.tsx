"use client";
import { useCallback, useMemo, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Avatar,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Tooltip, 
  } from "@nextui-org/react";
import { Key } from "@react-types/shared";
import { columns } from "@/lib/Users";


interface MatchListProps {
    data: MatchFinderTableProps[],
}

interface MatchFinderTableProps {
    id: number
    game: string,
    platform: string,
    entry: number,
    team_size: string,
    competition: string,
    support: string,
    starting: string,
    info?: MatchFinderInfoProps[]
}

interface MatchFinderInfoProps {
    pc_players: string,
    snipers: string,
    snaking: string,
    allowed_input: string
}

// interface MatchFinderTableProps extends Array<MatchFinderTableProps>{}



const statusColorMap: Record<string, ChipProps["color"]>  = {
    "available now": "success",
    "not available": "danger",
    vacation: "warning",
};

export const MatchFinderTable = ({data}: MatchListProps) => {
    type User = typeof data[0];
    
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    // const filteredItems = useMemo(() => {
    //     let filteredUsers = [...data];
    
    //     if (hasSearchFilter) {
    //       filteredUsers = filteredUsers.filter((user) =>
    //         user.name.toLowerCase().includes(filterValue.toLowerCase()),
    //       );
    //     }
    //     if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
    //       filteredUsers = filteredUsers.filter((user) =>
    //         Array.from(statusFilter).includes(user.status),
    //       );
    //     }
    
    //     return filteredUsers;
    // }, [users, filterValue, statusFilter]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return data.slice(start, end);
      }, [page, data, rowsPerPage]);


    const pages = Math.ceil(data.length / rowsPerPage);

    const onNextPage = useCallback(() => {
        if (page < pages) {
          setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
    if (page > 1) {
        setPage(page - 1);
    }
    }, [page]);

    const renderToolTip = ((data: any) => {
        
        if (!data) return null;

        let key = Object.keys(data)
        let value = Object.values(data)

        return (
            <div>
                <ul>
                    <li><span className="font-bold">{key[0]}:</span> {value[0] as string}</li>
                    <li><span className="font-bold">{key[1]}:</span> {value[1] as string}</li>
                    <li><span className="font-bold">{key[2]}:</span> {value[2] as string}</li>
                    <li><span className="font-bold">{key[3]}:</span> {value[3] as string}</li>
                </ul>
            </div>
        )
    })
    
    const renderCell = useCallback((user: any, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];
    
        switch (columnKey) {
          case "game":
            return (
                <div>
                    <Avatar
                        // size="lg"
                        // avatarProps={{radius: "full", size: "sm", src: ""}}
                        // classNames={"text-default-500"}
                        // description={user.game}
                        name={user.game}
                    />
                </div>
              
            );
          case "platform":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{user.platform}</p>
                {/* <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p> */}
              </div>
            );
          case "starting":
            return (
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={statusColorMap[user.starting]}
                size="sm"
                variant="dot"
              >
                {user.starting}
              </Chip>
            );
          case "rules":
            return (
              <div className="relative flex justify-end items-center gap-2">
                <Tooltip content={renderToolTip(user.rules[0])}>
                    <Button>i</Button>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
      }, []);

      const bottomContent = useMemo(() => {
        return (
          <div className="py-2 px-2 flex justify-between items-center">
            {/* <span className="w-[30%] text-small text-default-400">
              {selectedKeys === "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            /> */}
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Previous
              </Button>
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                Next
              </Button>
            </div>
          </div>
        );
      }, [selectedKeys, data.length, page, pages]);

      console.log("data", data.length)

    return (

        <Table 
            className="text-black " 
            aria-label="Example table with dynamic content" 
            bottomContent={bottomContent}
            onSelectionChange={setSelectedKeys}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
        // <div>
        //     <div>
        //         <div className="flex flex-row justify-evenly gap-3">
        //             <h4>GAME</h4>
        //             <h4>PLATFORM</h4>
        //             <h4>ENTRY</h4>
        //             <h4>TEAM SIZE</h4>
        //             <h4>COMPEITION</h4>
        //             <h4>SUPPORT</h4>
        //             <h4>STARTING</h4>
        //             <h4>INFO</h4>
        //         </div>
        //         {data.map(({
        //             id, game, platform, entry, time_size, competition, 
        //             support, starting, info
        //         }) => (
        //             <div key={id} className="flex flex-row justify-evenly gap-10 relative">
        //                 <p>{game}</p>
        //                 <p>{platform}</p>
        //                 <p>{entry}</p>
        //                 <p>{time_size}</p>
        //                 <p>{competition}</p>
        //                 <p>{support}</p>
        //                 <p>{starting}</p>
        //                 <p>{platform}</p>
        //                 <div>
        //                     <Button 
        //                         // onMouseEnter={openInfo}
        //                         // onMouseLeave={openInfo}
        //                         // className="w-4 bg-green-300 text-center hover:cursor-pointer px-5 py-2 rounded-2xl"
        //                     >
        //                         i
        //                     </Button>
        //                 </div>
                        
        //                 {openModal && 
        //                     // <div className="absolute z-10 bg-slate-500 border-black right-14 bottom-2">
        //                         <p>{info[0].allowed_input}</p>
                                
        //                     // </div>
        //                 }
        //             </div>
        //         ))}
        //     </div>
        // </div>
    )
}