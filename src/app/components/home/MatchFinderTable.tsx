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
import Link from "next/link";


interface MatchListProps {
    data: MatchFinderTableProps[] | any,
}

interface MatchFinderTableProps {
    id: number | string | any
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
    "not available": "danger"
};

export const MatchFinderTable = ({data}: MatchListProps) => {
    console.log("data", data)
    type User = typeof data[0];
    
    // const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [currentSet, setCurrentSet] = useState<number[]>([0,0])

    

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

        setCurrentSet([start, end])
        
        return data.matches.slice(start, end);
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
        
        console.log("key", key)
        console.log("value", value)
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
        console.log("users", user)
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
            case "platforms":
                return (
                    <div className="flex flex-col">
                        {user?.platforms.length > 1 ? "Cross Platform" : user.platforms}

{/* <p className="text-bold text-small capitalize">{platform}</p> */}
                        
                    </div>
                );
            case "start_time":
                let d1 = new Date(user.start_time), 
                    d2 = new Date(); 

                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={d1.valueOf() <= d2.valueOf() ? statusColorMap["available now"] : statusColorMap["not available"]}
                        size="sm"
                        variant="dot"
                    >
                        { d1.valueOf() <= d2.valueOf() ? "Available Now" : "Not Available"}
                    </Chip>
                );
            // case "rules":
            //     return (
            //         <div className="relative flex justify-center items-center gap-2">
            //             <Tooltip content={renderToolTip(user?.rules[0])}>
            //                 <button className="text-center bg-gray-400 px-2 py-1 rounded-full">i</button>
            //             </Tooltip>
            //         </div>
            //     );
            case "link":
                return (
                    <div className="flex">
                        <Button className="bg-green-600"><Link href={`/tournaments/${user.id}`}>Accept</Link></Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 block items-center">
                <div className="flex justify-between">
                    <p>{currentSet[0]} out of {data.length} cash matches</p>
                    <div className="flex gap-2">
                        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                            Previous
                        </Button>
                        <Button isDisabled={pages === 1} size="sm" variant="solid" onPress={onNextPage}>
                            Next
                        </Button>
                    </div>
                    
                </div>
            </div>
        );
    }, [ items.length, page, pages, currentSet]);

    return (
        <Table 
            className="text-black " 
            aria-label="Cash Match Finder" 
            bottomContent={bottomContent}
            // onSelectionChange={setSelectedKeys}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key} className="text-center">{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
                {(item: any) => (
                <TableRow key={item?.id}>
                    {(columnKey) => <TableCell className="text-center">{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
                )}
            </TableBody>
        </Table>
    )
}