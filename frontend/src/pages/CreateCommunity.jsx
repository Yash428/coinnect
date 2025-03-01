import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/CreateCommunity.css";
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateCommunity = () => { 
  const navigate = useNavigate();
  const user = useSelector(state=>state.auth.data)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // Initial mock data
  const initialCommunities = [
    
  ];

  // Get communities from localStorage or use initial data
  const getInitialCommunities = () => {
    const savedCommunities = localStorage.getItem('communities');
    return savedCommunities ? JSON.parse(savedCommunities) : initialCommunities;
  };

  // Get joined communities from localStorage
  const getJoinedCommunities = () => {
    const savedJoined = localStorage.getItem('userJoinedCommunities');
    return savedJoined ? JSON.parse(savedJoined) : [];
  };

  // State for both the current page and shared with JoinCommunity
  const [communities, setCommunities] = useState([]);
  const [userJoinedCommunities, setUserJoinedCommunities] = useState(getJoinedCommunities);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newCommunity, setNewCommunity] = useState(null);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'join'

  useEffect(()=>{
    axios.get("http://localhost:8002/api/v1/community/getall",{},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(res=>res.data)
    .then(result=>{
      setCommunities(result.data);
    })
    .catch(err=>console.error("Error fetching communities:",err));

  },[])

  // Save communities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communities', JSON.stringify(communities));
  }, [communities]);

  // Save joined communities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userJoinedCommunities', JSON.stringify(userJoinedCommunities));
  }, [userJoinedCommunities]);

  const handleCreateCommunity = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8002/api/v1/community/create", {
        name:name,
        description:description,
        userId:user.id 
    },{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
    .then((res) => res.data)
    .then((result) => {
      alert("Community Created Successfully!");
      navigate(`/community/${result.data.id}`);
    })
    .catch((err) => {
      console.error("Error creating community:", err);
      alert("Failed to create community");
    })

  };

  const handleJoinCommunity = (communityId, e) => {
    e.preventDefault()
    axios.post("http://localhost:8002/api/v1/community/join",{
      communityId: communityId
    },{
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      }
    })
    .then((res) => res.data)
    .then((result) => {
      alert("Joined Community Successfully!");
      setUserJoinedCommunities(prev => [...prev, communityId]);
    })
    .catch((err) => {
      console.error("Error joining community:", err);
      alert("Failed to join community");
    })

    navigate(`/community/${communityId}`);
  };

  const handleViewCommunity = (community) => {
    setSelectedCommunity(community);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const navigateToJoinCommunity = () => {
    navigate('/join');
  };

  const navigateToCommunity = (communityId, e) => {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/community/${communityId}`);
  };

  return (
    <div className="community-portal">
      <header className="portal-header">
        <h1>Community Portal</h1>
        <div className="portal-actions">
          <div className="tabs">
            
            <Link to={'/join'}
              className={`tab-btn ${activeTab === 'join' ? 'active' : ''}`}
              onClick={() => navigateToJoinCommunity()}
            >
              Join Communities
            </Link>
          </div>
          {activeTab === 'browse' && (
            <button 
              className="create-btn"
              onClick={() => setIsCreating(!isCreating)}
            >
              {isCreating ? 'Cancel' : 'Create Community'}
            </button>
          )}
        </div>
      </header>

      {isCreating && activeTab === 'browse' && (
        <div className="create-community-form">
          <h2>Create New Community</h2>
          <form onSubmit={handleCreateCommunity}>
            <div className="form-group">
              <label htmlFor="name">Community Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={e=>setName(e.target.value)}
                required
                placeholder="Enter community name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={e=>setDescription(e.target.value)}
                required
                placeholder="Describe your community"
                rows="4"
              />
            </div>
            <button type="submit" className="submit-btn">
              Create Community
            </button>
          </form>
        </div>
      )}

      {activeTab === 'browse' && (
        <div className="communities-container">
          <div className="communities-list">
            <h2>Available Communities</h2>
            <ul>
              {communities.length > 0 ? (
                communities.map(community => (
                  <li key={community.id} className="community-item">
                    <div 
                      className="community-info"
                      onClick={() => handleViewCommunity(community)}
                    >
                      <h3>{community.name}</h3>
                      <p>{community.description?.substring(0, 100)}...</p>
                    </div>
                    <div className="item-meta">
                      <span>{community.members_count} members</span>
                      {userJoinedCommunities.some(c => c.id === community.id) ? (
                        <button 
                          className="join-btn"
                          onClick={(e) => navigateToCommunity(community.id, e)}
                        >
                          Visit Community
                        </button>
                      ) : (
                        <button 
                          className="join-btn"
                          onClick={(e) => handleJoinCommunity(community.id, e)}
                        >
                          Join
                        </button>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <div className="no-communities">
                  <p>No communities found. Create one to get started!</p>
                </div>
              )}
            </ul>
          </div>

          {selectedCommunity && (
            <div className="community-details">
              <h2>{selectedCommunity.name}</h2>
              <div className="details-card">
                <p className="description">{selectedCommunity.description}</p>
                <div className="meta-info">
                  <p><strong>Created by:</strong> {selectedCommunity.created_by}</p>
                  <p><strong>Members:</strong> {selectedCommunity.members_count}</p>
                  <p><strong>Created:</strong> {new Date(selectedCommunity.createdAt).toLocaleDateString()}</p>
                </div>
                {userJoinedCommunities.some(c => c.id === selectedCommunity.id) ? (
                  <button 
                    className="view-posts-btn large"
                    onClick={(e) => navigateToCommunity(selectedCommunity.id, e)}
                  >
                    Visit Community
                  </button>
                ) : (
                  <button 
                    className="join-btn large"
                    onClick={(e) => handleJoinCommunity(selectedCommunity.id, e)}
                  >
                    Join This Community
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Popup notification for community creation */}
      {showPopup && newCommunity && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-popup" onClick={closePopup}>×</button>
            <div className="popup-content">
              <div className="success-icon">✓</div>
              <h3>Community Created Successfully!</h3>
              <p>Your new community "{newCommunity.name}" has been created.</p>
              <p>Redirecting to your community page...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCommunity;