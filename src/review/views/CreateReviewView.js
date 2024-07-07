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
                    <Typography component="h1" variant="h5" 
                    style={{ textAlign: "left", borderBottom: "1px solid #ddd", paddingBottom: "10px", margiBnottom: "20px"}}>
                        <b>Review</b>
                    </Typography>
                </Grid>
            </Grid>
            <br />
            <Grid>
                <h3 style={{ textAlign: "center" }}>상품은 만족하셨나요?</h3>
                
                <form onSubmit={handleSubmit}>
                    <StarRating onChange={handleStarChange} />
                    <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>내용</Typography>
                        <TextField
                            multiline
                            rows={4}
                            name="content"
                            value={content}
                            onChange={(e) => handleChange('content', e.target.value)}
                            fullWidth
                            placeholder="10자 이상 작성해주세요"
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        
                        {error && <Typography color="error">{error}</Typography>}
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