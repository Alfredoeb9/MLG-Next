"use client";
import { useCallback, useState } from "react";
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
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor
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
    function openInfo() {
        setOpenModal(!openModal);
        
    }
    
    const renderCell = useCallback((user: any, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        console.log("cellvalue", cellValue)
    
        switch (columnKey) {
          case "game":
            return (
              <User
                avatarProps={{radius: "full", size: "sm", src: ""}}
                classNames={{
                  description: "text-default-500",
                }}
                description={user.game}
                name={user.game}
              />
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
          case "info":
            return (
              <div className="relative flex justify-end items-center gap-2">
                <Dropdown className="bg-background border-1 border-default-200">
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="light">
                        press
                      {/* <VerticalDotsIcon className="text-default-400" /> */}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    
                    <DropdownItem>Allowed Input: {user.info[0].allowed_input}</DropdownItem>
                    <DropdownItem>PC Players: {user.info[0].pc_players}</DropdownItem>
                    <DropdownItem>Snaking: {user.info[0].snaking}</DropdownItem>
                    <DropdownItem>Snipers: {user.info[0].snipers}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            );
          default:
            return cellValue;
        }
      }, []);

    return (

        <Table className="text-black" aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={data}>
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