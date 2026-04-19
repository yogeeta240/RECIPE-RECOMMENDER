import React, { useCallback, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Box, Typography, Alert, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import axios from 'axios';

const ImageUploadModal = ({ open, onClose, onDetect }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detectedIngredients, setDetectedIngredients] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError('Please upload a valid image file (JPG, PNG, or WebP)');
      return;
    }
    
    setError(null);
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
    setLoading(true);
    
    // Mock API call; replace with actual endpoint when ready
    setTimeout(() => {
      setLoading(false);
      const mockIngredients = ['tomato', 'onion', 'garlic', 'bell pepper'];
      setDetectedIngredients(mockIngredients);
      // Example: axios.post('/api/detect-ingredients', formData)
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 
      'image/jpeg': ['.jpg', '.jpeg'], 
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB limit
    multiple: false
  });

  const handleConfirm = () => {
    if (detectedIngredients.length > 0) {
      onDetect(detectedIngredients);
      handleClose();
    }
  };

  const handleClose = () => {
    setImage(null);
    setError(null);
    setDetectedIngredients([]);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Upload Ingredient Image
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            p: 4,
            textAlign: 'center',
            bgcolor: isDragActive ? 'primary.50' : 'grey.50',
            borderRadius: 2,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.50'
            }
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image or click to select'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supports JPG, PNG, WebP (max 5MB)
          </Typography>
        </Box>
        
        {image && (
          <Box sx={{ mt: 2 }}>
            <img 
              src={image} 
              alt="Preview" 
              style={{ 
                maxWidth: '100%', 
                borderRadius: 8, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
              }} 
            />
          </Box>
        )}
        
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Analyzing image for ingredients...
            </Typography>
          </Box>
        )}
        
        {detectedIngredients.length > 0 && !loading && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Detected Ingredients:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {detectedIngredients.map((ingredient, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  {ingredient}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleConfirm} 
          disabled={loading || detectedIngredients.length === 0}
          variant="contained"
        >
          Use These Ingredients
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUploadModal;