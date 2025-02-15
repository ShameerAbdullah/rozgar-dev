"use client";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Building2, MapPin, Banknote, Search as SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Appbar from "../components/Appbar";
import Footer from "../components/footer";

export default function Jobs() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    salaryRanges: []
  });
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    salary: "",
  });
  const [expandedSkills, setExpandedSkills] = useState({});

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch('/api/jobs/filters');
      if (!response.ok) throw new Error('Failed to fetch filter options');
      const data = await response.json();
      setFilterOptions(data);
    } catch (err) {
      console.error('Error fetching filter options:', err);
    }
  };

  const fetchJobs = async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      if (filterParams.search) queryParams.append('search', filterParams.search);
      if (filterParams.location) queryParams.append('location', filterParams.location);
      if (filterParams.salary) {
        const [min, max] = filterParams.salary.split('-');
        if (min) queryParams.append('minSalary', min);
        if (max) queryParams.append('maxSalary', max);
      }

      const response = await fetch(`/api/jobs?${queryParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      
      const data = await response.json();
      setJobs(data.jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field) => (event) => {
    const newFilters = {
      ...filters,
      [field]: event.target.value
    };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    fetchJobs(filters);
  };

  const toggleSkillsExpansion = (jobId) => {
    setExpandedSkills(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  useEffect(() => {
    fetchFilterOptions();
    fetchJobs();
  }, []);

  const formatSalary = (min, max) => {
    if (!min && !max) return "Salary not mentioned";
    if (min && !max) return `${min.toLocaleString()}+ PKR`;
    if (!min && max) return `Up to ${max.toLocaleString()} PKR`;
    return `${min.toLocaleString()} - ${max.toLocaleString()} PKR`;
  };

  const formatWorkType = (job) => {
    const types = [];
    if (job.remote) types.push("Remote");
    if (job.hybrid) types.push("Hybrid");
    if (job.on_site) types.push("On-site");
    return types.join(" / ") || "Work type not specified";
  };

  const formatExperience = (min, max) => {
    if (min === 0 && (!max || max === 0)) return "Fresh / No experience required";
    if (!min && !max) return "Experience requirement not specified";
    if (min && !max) return `${min}+ years`;
    if (!min && max) return `Up to ${max} years`;
    return `${min} - ${max} years`;
  };

  const getEmptyMessage = (field) => {
    const messages = {
      description: "No description provided",
      location: "Location not specified",
      company_name: "Company name not provided",
      required_skills: "No specific skills mentioned",
      qualifications: "Qualifications not specified",
      where_to_apply: "Application instructions not provided"
    };
    return messages[field] || "Not specified";
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Appbar />
      <div className="flex-1 mt-10 lg:mt-20">
      <Container maxWidth="lg" sx={{ marginBottom: 2 }}>
        {/* Filters Section */}
        <Card sx={{ mb: 4, p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Search Jobs"
                variant="outlined"
                placeholder="Job title or keyword"
                value={filters.search}
                onChange={handleFilterChange('search')}
                InputProps={{
                  endAdornment: <SearchIcon size={20} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select 
                  label="Location"
                  value={filters.location}
                  onChange={handleFilterChange('location')}
                >
                  <MenuItem value="">All Locations</MenuItem>
                  {filterOptions.locations.map((location) => (
                    <MenuItem key={location} value={location}>{location}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Salary Range</InputLabel>
                <Select 
                  label="Salary Range"
                  value={filters.salary}
                  onChange={handleFilterChange('salary')}
                >
                  <MenuItem value="">All Ranges</MenuItem>
                  {filterOptions.salaryRanges.map((range) => (
                    <MenuItem key={range.value} value={range.value}>
                      {range.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleApplyFilters}
                sx={{
                  backgroundColor: "#4b8b93",
                  height: "56px",
                  "&:hover": {
                    backgroundColor: "#3d7179",
                  },
                }}
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress sx={{ color: "#4b8b93" }} />
          </Box>
        ) : (
          /* Jobs List */
          <Grid container spacing={3}>
            {jobs.length === 0 ? (
              <Grid item xs={12}>
                <Alert severity="info">
                  No jobs found matching your criteria.
                </Alert>
              </Grid>
            ) : (
              jobs.map((job) => (
                <Grid item xs={12} key={job._id}>
                  <Card 
                    sx={{ 
                      '&:hover': {
                        boxShadow: 6,
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6" component="h2" color="#4b8b93">
                            {job.title || "Position not specified"}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Building2 size={18} />
                            <Typography variant="body2" color="text.secondary">
                              {job.company_name || getEmptyMessage('company_name')}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <MapPin size={18} />
                            <Typography variant="body2" color="text.secondary">
                              {job.location || getEmptyMessage('location')} • {formatWorkType(job)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <Banknote size={18} />
                            <Typography variant="body2" color="text.secondary">
                              {formatSalary(job.min_salary, job.max_salary)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            {job.description || getEmptyMessage('description')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="#4b8b93" sx={{ mb: 1 }}>
                            Required Skills:
                          </Typography>
                          {job.required_skills && job.required_skills.length > 0 ? (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {job.required_skills.slice(0, expandedSkills[job._id] ? undefined : 5).map((skill, index) => (
                                <Chip 
                                  key={index}
                                  label={skill}
                                  size="small"
                                  sx={{ 
                                    backgroundColor: '#4b8b93',
                                    color: 'white'
                                  }}
                                />
                              ))}
                              {!expandedSkills[job._id] && job.required_skills.length > 5 && (
                                <Chip 
                                  label={`+${job.required_skills.length - 5} more`}
                                  size="small"
                                  onClick={() => toggleSkillsExpansion(job._id)}
                                  sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                      backgroundColor: '#3d7179',
                                      color: 'white'
                                    }
                                  }}
                                />
                              )}
                              {expandedSkills[job._id] && (
                                <Chip 
                                  label="Show less"
                                  size="small"
                                  onClick={() => toggleSkillsExpansion(job._id)}
                                  sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                      backgroundColor: '#3d7179',
                                      color: 'white'
                                    }
                                  }}
                                />
                              )}
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {getEmptyMessage('required_skills')}
                            </Typography>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="#4b8b93" sx={{ mb: 1 }}>
                            Experience Required:
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatExperience(job.min_exp_in_years, job.max_exp_in_years)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="#4b8b93" sx={{ mb: 1 }}>
                            Qualifications:
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {job.qualifications || getEmptyMessage('qualifications')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle2" color="#4b8b93" sx={{ mb: 1 }}>
                            How to Apply:
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {job.where_to_apply || getEmptyMessage('where_to_apply')}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
      </div>
      <Footer />
    </div>
  );
}
