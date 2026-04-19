import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import jsPDF from 'jspdf';

const ShoppingListModal = ({ open, onClose, ingredients }) => {
  const pantry = ['rice']; // Mock pantry; integrate with profile later

  const missingIngredients = ingredients.filter((ing) => !pantry.includes(ing.name.toLowerCase()));

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.text('Shopping List', 10, 10);
    missingIngredients.forEach((ing, index) => {
      doc.text(`${index + 1}. ${ing.name} - ${ing.quantity}`, 10, 20 + index * 10);
    });
    doc.save('shopping-list.pdf');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Shopping List</DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            {missingIngredients.map((ing, index) => (
              <TableRow key={index}>
                <TableCell>{ing.name}</TableCell>
                <TableCell>{ing.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {missingIngredients.length === 0 && <Typography>No items needed!</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={generatePDF} variant="contained" disabled={missingIngredients.length === 0}>
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingListModal;