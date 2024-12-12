import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNews } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import jsPDF from "jspdf";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newsAndBlogs = useSelector((state) => state.news.news);
  const [searchTerm, setSearchTerm] = useState("");
  const [contentType, setContentType] = useState("all");
  const [payoutPerArticle, setPayoutPerArticle] = useState(() => {
    return Number(localStorage.getItem("payoutPerArticle")) || 0;
  });

  useEffect(() => {
    const fetchNewsAndBlogs = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );

        const categorizedPosts = response.data.map((post) => ({
          ...post,
          type: Math.random() > 0.5 ? "news" : "blog",
        }));

        dispatch(setNews(categorizedPosts));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNewsAndBlogs();
  }, [dispatch]);

  const filteredContent = Array.isArray(newsAndBlogs)
    ? newsAndBlogs.filter((item) => {
        const matchesSearchTerm = item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesContentType =
          contentType === "all" ||
          (contentType === "news" && item.type === "news") ||
          (contentType === "blogs" && item.type === "blog");
        return matchesSearchTerm && matchesContentType;
      })
    : [];

  const totalPayout = filteredContent.length * payoutPerArticle;

  const handleReadMore = (postId) => {
    navigate(`/news/${postId}`);
  };

  const handlePayoutChange = (e) => {
    const value = Number(e.target.value);
    setPayoutPerArticle(value);
    localStorage.setItem("payoutPerArticle", value);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payout Report", 20, 20);

    doc.setFontSize(12);
    filteredContent.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.title} - $${payoutPerArticle}`,
        20,
        30 + index * 10
      );
    });

    doc.text(
      `\nTotal Payout: $${totalPayout}`,
      20,
      30 + filteredContent.length * 10
    );
    doc.save("Payout_Report.pdf");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleLogout}
        style={{ float: "right", marginBottom: "20px" }}
      >
        Logout
      </Button>

      <div style={{ marginBottom: "20px" }}>
        <TextField
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search news or blogs..."
          label="Search"
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />

        <TextField
          select
          fullWidth
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          label="Filter by Type"
          SelectProps={{ native: true }}
          variant="outlined"
        >
          <option value="all">All</option>
          <option value="news">News</option>
          <option value="blogs">Blogs</option>
        </TextField>
      </div>

      <Box mb={2}>
        <TextField
          type="number"
          label="Payout Per Article ($)"
          value={payoutPerArticle}
          onChange={handlePayoutChange}
          fullWidth
          variant="outlined"
        />
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          Total Payout: ${totalPayout}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={handleExportPDF}
        >
          Export Payout Report as PDF
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.body.substring(0, 100)}...
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleReadMore(item.id)}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            style={{ width: "100%" }}
          >
            No content available.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default Dashboard;
