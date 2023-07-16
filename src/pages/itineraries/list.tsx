import React from "react";
import {
    IResourceComponentsProps,
    useTranslate,
    GetManyResponse,
    useMany,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    List,
    usePagination,
    EditButton,
    ShowButton,
    DateField,
} from "@refinedev/chakra-ui";
import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    HStack,
    Button,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons";

export const ItineraryList: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: translate("itineraries.fields.id"),
            },
            {
                id: "title",
                accessorKey: "title",
                header: translate("itineraries.fields.title"),
            },
            {
                id: "date",
                accessorKey: "date",
                header: translate("itineraries.fields.date"),
                cell: function render({ getValue }) {
                    return <DateField value={getValue<any>()} />;
                },
            },
            {
                id: "location",
                accessorKey: "location",
                header: translate("itineraries.fields.location"),
            },
            {
                id: "type_of_activity",
                accessorKey: "type_of_activity",
                header: translate("itineraries.fields.type_of_activity"),
            },
            {
                id: "notes",
                accessorKey: "notes",
                header: translate("itineraries.fields.notes"),
            },
            {
                id: "created_at",
                accessorKey: "created_at",
                header: translate("itineraries.fields.created_at"),
                cell: function render({ getValue }) {
                    return <DateField value={getValue<any>()} />;
                },
            },
            {
                id: "project_id",
                header: translate("itineraries.fields.project_id"),
                accessorKey: "project_id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        projectData: GetManyResponse;
                    };

                    const project = meta.projectData?.data?.find(
                        (item) => item.id == getValue<any>(),
                    );

                    return project?.title ?? "Loading...";
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <EditButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                        </HStack>
                    );
                },
            },
        ],
        [translate],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const { data: projectData } = useMany({
        resource: "projects",
        ids: tableData?.data?.map((item) => item?.project_id) ?? [],
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            projectData,
        },
    }));

    return (
        <List>
            <TableContainer whiteSpace="pre-line">
                <Table variant="simple">
                    <Thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th key={header.id}>
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                current={current}
                pageCount={pageCount}
                setCurrent={setCurrent}
            />
        </List>
    );
};

type PaginationProps = {
    current: number;
    pageCount: number;
    setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    current,
    pageCount,
    setCurrent,
}) => {
    const pagination = usePagination({
        current,
        pageCount,
    });

    return (
        <Box display="flex" justifyContent="flex-end">
            <HStack my="3" spacing="1">
                {pagination?.prev && (
                    <IconButton
                        aria-label="previous page"
                        onClick={() => setCurrent(current - 1)}
                        disabled={!pagination?.prev}
                        variant="outline"
                    >
                        <IconChevronLeft size="18" />
                    </IconButton>
                )}

                {pagination?.items.map((page) => {
                    if (typeof page === "string")
                        return <span key={page}>...</span>;

                    return (
                        <Button
                            key={page}
                            onClick={() => setCurrent(page)}
                            variant={page === current ? "solid" : "outline"}
                        >
                            {page}
                        </Button>
                    );
                })}
                {pagination?.next && (
                    <IconButton
                        aria-label="next page"
                        onClick={() => setCurrent(current + 1)}
                        variant="outline"
                    >
                        <IconChevronRight size="18" />
                    </IconButton>
                )}
            </HStack>
        </Box>
    );
};
