import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Container, CircularProgress, TextField, Button } from '@mui/material';
import { ModifyReviewViewModel } from '../viewModels/ModifyReviewViewModel';
import StarRating from '../components/StarRating';

export default function ModifyReviewView({ reviewId }) {
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
    <div className="review-list-page"
    style={{border : "1px solid #e0e0e0", margin: "0 auto", padding: "2rem 1.2rem"}} >
    <Container component="main" maxWidth="xs" sx={{ marginTop: "8%" }}>
      <Typography component="h1" variant="h5"
        style={{ textAlign: "left", borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "20px" }}>
        <b>Review</b>
      </Typography>
      <br />

      <Grid>
      <h3 style={{ textAlign: "center" }}>상품은 만족하셨나요?</h3>
      <StarRating onChange={handleStarChange} initialRating={values.star} />
        <form onSubmit={handleSubmit}>
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
          <Button variant="contained" color="primary" type="submit" fullWidth disabled={isSubmitting}
          style={{backgroundColor: "#516FF5"}}> 
            후기 수정
          </Button>

          <Button variant="outlined" color="secondary" 
          style={{ marginBottom: "50%", color: "#464646", borderColor: "#464646"}}
            onClick={() => window.history.back()} fullWidth sx={{ mt: 2, '&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.04)' }}}>
            취소
          </Button>
        </form>
      </Grid>
    </Container>
    </div>
  );
}