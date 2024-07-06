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
      <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
        <b>리뷰 수정</b>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StarRating onChange={handleStarChange} initialRating={values.star} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="리뷰 내용"
              multiline
              rows={4}
              name="content"
              value={values.content}
              onChange={(e) => handleChange('content', e.target.value)}
              fullWidth
              margin="normal"
              required
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isSubmitting}
            >
              수정하기
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.history.back()}
              fullWidth
            >
              취소
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}