import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { query, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Delete, DeleteOutline, Edit } from "@mui/icons-material";
import Form from "./Form";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

type BookObjectType = {
  id: string;
  title: string;
  author: string;
  genre: string;
  page: string;
  rating: string;
};

export default function CustomizedTables() {
  const [data, setData] = React.useState<BookObjectType[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<BookObjectType>();
  React.useEffect(() => {
    const queryfs = query(collection(db, "books"));
    const unsub = onSnapshot<BookObjectType>(queryfs, (docs) => {
      const newData: BookObjectType[] = [];

      docs.forEach((doc) => {
        const item = doc.data();
        item.id = doc.id;
        newData.push(item);
      });
      console.log(newData);
      setData([...newData]);
    });

    return () => {
      unsub();
    };
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Books</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">Page</StyledTableCell>
              <StyledTableCell align="right">Rating</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.title}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.author}</StyledTableCell>
                <StyledTableCell align="right">{row.genre}</StyledTableCell>
                <StyledTableCell align="right">{row.page}</StyledTableCell>
                <StyledTableCell align="right">{row.rating}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    onClick={async () => {
                      await deleteDoc(doc(db, "books", row.id));
                      await console.log("başarıyla silindi");
                    }}
                  >
                    <DeleteOutline />
                  </IconButton>
                  <IconButton
                    onClick={async () => {
                      // await updateDoc(doc(db, "books", row.id), {
                      //   title: "ananın amı",
                      // });
                      setSelectedBook(row);
                      setOpen(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </button>
      </TableContainer>
      <Dialog
        open={open}
        onClose={() => {
          setSelectedBook(undefined);
          setOpen(false);
        }}
      >
        <DialogContent>
          {!!selectedBook? <Form type="edit" initial={selectedBook} /> : <Form type="add" />}
        </DialogContent>
      </Dialog>
    </>
  );
}
