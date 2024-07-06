import React from "react";
import { useLocation } from "react-router-dom";
import { CreateReviewViewModel } from "../viewModels/CreateReviewViewModel";
import StarRating from "../components/StarRating";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";

function CreateReviewView() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get('itemId');
    const userId = searchParams.get('userId');

    //console.log("itemId:", itemId, "userId:", userId);
    
    const { content, star, handleChange, handleSubmit, handleStarChange, error } = CreateReviewViewModel(itemId, userId);
  
    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                        <b>리뷰 작성</b>
                    </Typography>
                </Grid>
            </Grid>
            <br />
            <Grid>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit}>
                    <StarRating onChange={handleStarChange} />
                    <TextField
                        label="리뷰 내용"
                        multiline
                        rows={4}
                        name="content"
                        value={content}
                        onChange={(e) => handleChange('content', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        리뷰 등록
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => window.history.back()} fullWidth sx={{ mt: 2 }}>
                        취소
                    </Button>
                </form>
            </Grid>
        </Container>
    );
}

export default CreateReviewView;