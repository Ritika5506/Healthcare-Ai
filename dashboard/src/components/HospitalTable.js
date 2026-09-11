import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

const HospitalTable = ({ trainingData }) => {
  return (
    <Table>

      <TableHead>
        <TableRow>
          <TableCell>Round</TableCell>
          <TableCell>Hospital</TableCell>
          <TableCell>Accuracy</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {trainingData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.round}</TableCell>
            <TableCell>{item.hospital}</TableCell>
            <TableCell>{item.accuracy}%</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  );
};

export default HospitalTable;
