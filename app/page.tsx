"use client";
import { Button, styled } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/hello?page=${page}`);
      const data = await res.json();
      setData(data.data);
      setTotalPages(data.totalPages);
      console.log(data);
    };

    getData();
  }, [page]);

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "Column 1",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
            alt="avatar"
            className="h-[32px] w-auto"
          />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];

  function customCheckbox() {
    return {
      "& .MuiCheckbox-root svg": {
        width: 16,
        height: 16,
        backgroundColor: "transparent",
        border: `1px solid rgb(67, 67, 67)`,
        borderRadius: 2,
      },
      "& .MuiCheckbox-root svg path": {
        display: "none",
      },
      "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
        backgroundColor: "orange",
        borderColor: "orange",
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22%3E%3Cpath fill=%22white%22 d=%22M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z%22/%3E%3C/svg%3E')",
      },
      "& .MuiCheckbox-root.Mui-checked .MuiSvgIcon-root": {
        display: "block",
        color: "white",
      },
      "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiSvgIcon-root": {
        display: "block",
        color: "white",
      },
      "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
        {
          width: 8,
          height: 8,
          backgroundColor: "orange",
          transform: "none",
          top: "39%",
          border: 0,
        },
      "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
        position: "absolute",
        display: "table",
        border: "2px solid #fff",
        borderTop: 0,
        borderLeft: 0,
        transform: "rotate(45deg) translate(-50%,-50%)",
        opacity: 1,
        transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
        content: '""',
        top: "50%",
        left: "39%",
        width: 5.71428571,
        height: 9.14285714,
      },
    };
  }

  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    WebkitFontSmoothing: "auto",
    letterSpacing: "normal",
    "& .MuiDataGrid-columnsContainer": {
      backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
      borderRight: `1px solid ${
        theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
      borderBottom: `1px solid ${
        theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
      }`,
    },
    "& .MuiDataGrid-cell": {
      color:
        theme.palette.mode === "light"
          ? "rgba(0,0,0,.85)"
          : "rgba(255,255,255,0.65)",
    },
    "& .MuiPaginationItem-root": {
      borderRadius: 0,
    },
    ...customCheckbox(),
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative" style={{ height: 300, width: "100%" }}>
        <StyledDataGrid
          checkboxSelection
          paginationMode="client"
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(newRowSelectionModel, val) => {
            console.log(val.api.getRow(newRowSelectionModel[0]), "val");

            setRowSelectionModel(newRowSelectionModel);
          }}
          disableMultipleRowSelection
          hideFooter
          rows={data}
          columns={columns}
        />
        <CustomPagination
          page={page}
          onPageChange={(page) => setPage(page)}
          totalPages={totalPages}
        />
        {rowSelectionModel.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{rowSelectionModel[0]}</span>
              <span></span>
              <span></span>
            </div>
            <div className="absolute flex justify-between bottom-1  rounded-lg p-2 h-[70px] bg-white shadow-md left-[600px]">
              <Button>Item</Button>
              <Button>Item</Button>
              <Button>Item</Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const CustomPagination = ({
  onPageChange,
  page,
  totalPages,
}: {
  onPageChange: (page: number) => void;
  page: number;
  totalPages: number;
}) => {
  return (
    <div className="flex justify-end items-center p-2">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span className="mx-2">Page {page}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
};
