import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Container, CircularProgress, TextField, Button } from '@mui/material';
import { ModifyReviewViewModel } from '../viewModels/ModifyReviewViewModel';
import StarRating from '../components/StarRating';

export default function ModifyReviewView() {
  const { reviewId } = useParams();
  const {
    values,
    handleChange,
    handleSubmit,
    handleStarChange,
    error,
    isSubmitting,
    isLoading
  } = ModifyReviewViewModel(reviewId);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" 
            style={{ textAlign: "left", borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "20px"}}>
            <b>Review</b>
          </Typography>
        </Grid>
      </Grid>
      <br />
      
      <Grid>
        <form onSubmit={handleSubmit}>
          <StarRating onChange={handleStarChange} initialRating={values.star} />
          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>내용</Typography>
          <TextField
            multiline
            rows={4}
            name="content"
            value={values.content}
            onChange={(e) => handleChange('content', e.target.value)}
            fullWidth
            placeholder="10자 이상 작성해주세요"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <Button variant="contained" color="primary" type="submit" fullWidth
            disabled={isSubmitting}
          > 리뷰 수정
          </Button>

          <Button variant="outlined" color="secondary" 
          onClick={() => window.history.back()} fullWidth sx={{ mt: 2 }}>
            취소
            </Button>
        </form>
      </Grid>
    </Container>
  );
}