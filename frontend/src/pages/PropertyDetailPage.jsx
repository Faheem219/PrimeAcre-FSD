import React, { useEffect, useState, useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import NatureIcon from "@mui/icons-material/Nature";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router-dom";
import { getPropertyById, markPropertyAsInterested } from "../api/propertyAPI"; // Import the new API function
import { getReviews, addReview, updateReview } from "../api/reviewAPI";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Slideshow from "../components/Slideshow";
import { AuthContext } from "../contexts/AuthContext";

function PropertyDetailPage() {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [errors, setErrors] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const [editReviewId, setEditReviewId] = useState(null);
  const [isInterested, setIsInterested] = useState(false); // State to handle interested status

  useEffect(() => {
    // Fetch property and reviews data
    const fetchData = async () => {
      try {
        const propertyData = await getPropertyById(id);
        setProperty(propertyData);

        // Check if the property is already marked as interested by the client
        if (auth.isAuthenticated && auth.role === "Client") {
          const isClientInterested = auth.user.interestedProperties.includes(
            propertyData._id
          );
          setIsInterested(isClientInterested);
        }

        const reviewsData = await getReviews(id);
        setReviews(reviewsData);
      } catch (error) {
        setErrors(
          error.response?.data?.error || "An error occurred while fetching data"
        );
      }
    };

    fetchData();
  }, [id, auth.isAuthenticated, auth.role, auth.user]);

  // Function to mark property as interested
  const handleMarkAsInterested = async () => {
    if (!auth.isAuthenticated || auth.role !== "Client") return;
    try {
      await markPropertyAsInterested(id);
      setIsInterested(true); // Update state to reflect the interested status
      window.location.reload();
    } catch (error) {
      setErrors(
        error.response?.data?.error ||
        "An error occurred while marking the property as interested"
      );
    }
  };

  // Handle opening and closing of the review form
  const handleOpenReviewForm = () => setOpenReviewForm(true);
  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
    setReviewData({ rating: 0, comment: "" });
  };

  // Handle opening and closing of the edit form
  const handleOpenEditForm = (review) => {
    setEditReviewId(review._id);
    setReviewData({ rating: review.rating, comment: review.comment });
    setOpenEditForm(true);
  };
  const handleCloseEditForm = () => {
    setOpenEditForm(false);
    setReviewData({ rating: 0, comment: "" });
    setEditReviewId(null);
  };

  // Handle form submission for adding a new review
  const handleReviewSubmit = async () => {
    try {
      const newReview = await addReview(id, reviewData);
      setReviews((prev) => [...prev, newReview]);
      handleCloseReviewForm();
      window.location.reload();
    } catch (error) {
      setErrors(
        error.response?.data?.error ||
        "An error occurred while submitting the review"
      );
    }
  };

  // Handle form submission for updating an existing review
  const handleReviewUpdate = async () => {
    try {
      const updatedReview = await updateReview(id, editReviewId, reviewData);
      setReviews((prev) =>
        prev.map((review) =>
          review._id === editReviewId ? updatedReview : review
        )
      );
      handleCloseEditForm();
      window.location.reload();
    } catch (error) {
      setErrors(
        error.response?.data?.error ||
        "An error occurred while updating the review"
      );
    }
  };

  if (!property) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          backgroundColor: "#121212",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#ff9800" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        padding: 4,
        fontFamily: "Proxima Nova, sans-serif",
        color: "#fff",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Property Details */}
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: 3, color: "#ff9800" }}
      >
        {property.title}
      </Typography>

      {/* "Mark as Interested" Button */}
      {auth.isAuthenticated && auth.role === "Client" && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleMarkAsInterested}
          sx={{
            marginBottom: 3,
            backgroundColor: isInterested ? "#757575" : "#ff9800",
            "&:hover": {
              backgroundColor: isInterested ? "#757575" : "#ff7043",
            },
          }}
        >
          {isInterested ? "Marked as Interested" : "Mark as Interested"}
        </Button>
      )}

      {/* Slideshow Component for Property Images */}
      {property.images && property.images.length > 0 && (
        <Box sx={{ maxWidth: "100%", overflow: "hidden", marginBottom: 4 }}>
          <Slideshow images={property.images} />
        </Box>
      )}

      <Paper
        sx={{
          padding: 3,
          backgroundColor: "#444",
          color: "#fff",
          marginBottom: 4,
        }}
      >
        <Grid container spacing={2} sx={{ marginBottom: 4 }}>
          {/* Property Details Cards */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#555", padding: 2 }}>
              <HomeIcon sx={{ color: "#fff" }} />
              <Typography variant="body1" sx={{ marginTop: 2, color: "#fff" }}>
                <strong>Property Type:</strong> {property.propertyType}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#555", padding: 2 }}>
              <BuildIcon sx={{ color: "#fff" }} />
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, color: "#fff" }}
              >
                <strong>Bedrooms:</strong> {property.bedrooms}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#555", padding: 2 }}>
              <NatureIcon sx={{ color: "#fff" }} />
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, color: "#fff" }}
              >
                <strong>Size:</strong> {property.size} sq ft
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#555", padding: 2 }}>
              <DriveEtaIcon sx={{ color: "#fff" }} />
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, color: "#fff" }}
              >
                <strong>Garage Spaces:</strong> {property.garageSpaces} Attached
                garage spaces
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#555", padding: 2 }}>
              <AttachMoneyIcon sx={{ color: "#fff" }} />
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, color: "#fff" }}
              >
                <strong>Price:</strong> ${property.price}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#555", padding: 2 }}>
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, color: "#fff" }}
              >
                <strong>Bathrooms:</strong> {property.bathrooms}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: "#555", padding: 2 }}>
              <NatureIcon sx={{ color: "#fff" }} />
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, color: "#fff" }}
              >
                <strong>Location:</strong> {property.location}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: 2, color: "#ff9800" }}
      >
        Description
      </Typography>
      <Button
        onClick={() => setShowDescription((prev) => !prev)}
        sx={{ marginBottom: 2 }}
      >
        {showDescription ? "Hide Description" : "Show Description"}
      </Button>
      {showDescription && (
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {property.description}
        </Typography>
      )}

      {/* Property Features Section */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: 3, color: "#ff9800" }}
      >
        What's Special
      </Typography>
      <Box sx={{ marginBottom: 4 }}>
        <Grid container spacing={1}>
          {property.specialFeatures && property.specialFeatures.length > 0 ? (
            property.specialFeatures.map((feature, index) => (
              <Grid item key={index}>
                <Chip
                  label={feature}
                  sx={{
                    backgroundColor: "#e0e0e0",
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                  }}
                />
              </Grid>
            ))
          ) : (
            <Typography>
              Special features will be updated very soon, stay tuned.
            </Typography>
          )}
        </Grid>
      </Box>

      {/* Comments Section */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: 3, color: "#ff9800" }}
      >
        Comments
      </Typography>
      {reviews.length > 0 ? (
        <Grid container spacing={2} justifyContent="flex-start">
          {reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review._id}>
              <Card sx={{ backgroundColor: "#444", color: "#fff" }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {review.client.firstName} {review.client.lastName}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    <strong>Rating:</strong> {review.rating}/5
                  </Typography>
                  <Typography variant="body1">{review.comment}</Typography>
                  {review.edit && (
                    <Typography
                      variant="caption"
                      sx={{ display: "block", color: "#ff7043" }}
                    >
                      Edited
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    sx={{ display: "block", marginTop: 1, color: "#bbb" }}
                  >
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                  {/* Edit Button for client's own reviews */}
                  {auth.isAuthenticated &&
                    auth.role === "Client" &&
                    review.client._id === auth.user.id && (
                      <IconButton
                        onClick={() => handleOpenEditForm(review)}
                        sx={{ marginTop: 1, color: "#ff9800" }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            padding: 2,
            textAlign: "center",
            backgroundColor: "#333",
            color: "#fff",
          }}
        >
          <Typography>No comments available at the moment.</Typography>
        </Paper>
      )}

      {/* Submit Review Button for Authenticated Clients */}
      {auth.isAuthenticated && auth.role === "Client" && (
        <Box sx={{ marginTop: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenReviewForm}
            sx={{
              backgroundColor: "#ff9800",
              "&:hover": { backgroundColor: "#ff7043" },
            }}
          >
            Submit a Review
          </Button>
        </Box>
      )}

      {/* Review Form Modal for Adding New Review */}
      <Dialog open={openReviewForm} onClose={handleCloseReviewForm}>
        <DialogTitle>Submit a Review</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={reviewData.rating}
            onChange={(event, newValue) =>
              setReviewData({ ...reviewData, rating: newValue })
            }
            max={5}
          />
          <TextField
            label="Comment"
            name="comment"
            multiline
            rows={4}
            fullWidth
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({ ...reviewData, comment: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewForm} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleReviewSubmit}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Form Modal for Editing Existing Review */}
      <Dialog open={openEditForm} onClose={handleCloseEditForm}>
        <DialogTitle>Edit Your Review</DialogTitle>
        <DialogContent>
          <Rating
            name="rating"
            value={reviewData.rating}
            onChange={(event, newValue) =>
              setReviewData({ ...reviewData, rating: newValue })
            }
            max={5}
          />
          <TextField
            label="Comment"
            name="comment"
            multiline
            rows={4}
            fullWidth
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData({ ...reviewData, comment: e.target.value })
            }
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditForm} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleReviewUpdate}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PropertyDetailPage;
