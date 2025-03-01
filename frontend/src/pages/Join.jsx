import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/Join.css";

const Join = () => {
  const navigate = useNavigate();
  
  // Get initial data from localStorage
  const getInitialCommunities = () => {
    const savedCommunities = localStorage.getItem('communities');
    return savedCommunities ? JSON.parse(savedCommunities) : [];
  };

  const getJoinedCommunities = () => {
    const savedJoined = localStorage.getItem('userJoinedCommunities');
    return savedJoined ? JSON.parse(savedJoined) : [];
  };

  const [communities, setCommunities] = useState(getInitialCommunities);
  const [userJoinedCommunities, setUserJoinedCommunities] = useState(getJoinedCommunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all'); // 'all', 'joined', 'notJoined'
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  // Save communities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('communities', JSON.stringify(communities));
  }, [communities]);

  // Save joined communities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userJoinedCommunities', JSON.stringify(userJoinedCommunities));
  }, [userJoinedCommunities]);

  const handleJoinCommunity = (communityId, e) => {
    if (e) {
      e.stopPropagation();
    }
    
    // Find the community
    const community = communities.find(c => c.id === communityId);
    
    if (!community) return;
    
    // Check if not already joined
    if (!userJoinedCommunities.some(c => c.id === communityId)) {
      // Create updated joined communities array with new community
      const updatedJoined = [...userJoinedCommunities, community];
      
      // Update state and localStorage
      setUserJoinedCommunities(updatedJoined);
      localStorage.setItem('userJoinedCommunities', JSON.stringify(updatedJoined));
      
      // Update the members count
      const updatedCommunities = communities.map(c => 
        c.id === communityId ? {...c, members_count: c.members_count + 1} : c
      );
      setCommunities(updatedCommunities);
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
    }
    
    // Navigate to community posts
    navigate(`/community/${communityId}`);
  };

  const handleViewCommunity = (community) => {
    setSelectedCommunity(community);
  };

  const handleLeaveCommunity = (communityId, e) => {
    if (e) {
      e.stopPropagation();
    }
    
    // Find the community
    const community = communities.find(c => c.id === communityId);
    
    if (community && userJoinedCommunities.some(c => c.id === communityId)) {
      // Remove from joined communities
      const updatedJoined = userJoinedCommunities.filter(c => c.id !== communityId);
      setUserJoinedCommunities(updatedJoined);
      localStorage.setItem('userJoinedCommunities', JSON.stringify(updatedJoined));
      
      // Update the members count
      const updatedCommunities = communities.map(c => 
        c.id === communityId ? {...c, members_count: Math.max(1, c.members_count - 1)} : c
      );
      setCommunities(updatedCommunities);
      localStorage.setItem('communities', JSON.stringify(updatedCommunities));
      
      // Reset selected community if user leaves the currently selected one
      if (selectedCommunity && selectedCommunity.id === communityId) {
        setSelectedCommunity(null);
      }
      
      // Show success message
      alert(`Successfully left ${community.name}.`);
    }
  };

  const navigateToCommunity = (communityId, e) => {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/community/${communityId}`);
  };

  // Filter communities based on search term and filter option
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (community.description && community.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterOption === 'all') return matchesSearch;
    if (filterOption === 'joined') return matchesSearch && userJoinedCommunities.some(c => c.id === community.id);
    if (filterOption === 'notJoined') return matchesSearch && !userJoinedCommunities.some(c => c.id === community.id);
    
    return matchesSearch;
  });

  return (
    <div className="join-community-page">
      <header className="portal-header">
        <h1>Join Communities</h1>
        <div className="navigation-links">
          <Link to="/create" className="nav-link">Create Community</Link>
          <Link to="/doubt" className="nav-link">Dashboard</Link>
        </div>
      </header>

      <div className="filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <button 
            className={`filter-btn ${filterOption === 'all' ? 'active' : ''}`}
            onClick={() => setFilterOption('all')}
          >
            All Communities
          </button>
          <button 
            className={`filter-btn ${filterOption === 'joined' ? 'active' : ''}`}
            onClick={() => setFilterOption('joined')}
          >
            My Communities
          </button>
          <button 
            className={`filter-btn ${filterOption === 'notJoined' ? 'active' : ''}`}
            onClick={() => setFilterOption('notJoined')}
          >
            Available to Join
          </button>
        </div>
      </div>

      <div className="communities-layout">
        <div className="communities-grid">
          {filteredCommunities.length > 0 ? (
            filteredCommunities.map(community => (
              <div 
                key={community.id} 
                className="community-card"
                onClick={() => handleViewCommunity(community)}
              >
                <div className="community-header">
                  <h3>{community.name}</h3>
                  {userJoinedCommunities.some(c => c.id === community.id) && (
                    <span className="member-badge">Member</span>
                  )}
                </div>
                <p className="community-description">{community.description?.substring(0, 150)}...</p>
                <div className="community-footer">
                  <div className="community-stats">
                    <span className="members-count">{community.members_count} members</span>
                    <span className="creation-date">Created: {new Date(community.createdAt).toLocaleDateString()}</span>
                  </div>
                  {userJoinedCommunities.some(c => c.id === community.id) ? (
                    <div className="community-actions">
                      <button 
                        className="join-community-btn"
                        onClick={(e) => navigateToCommunity(community.id, e)}
                      >
                        Visit Community
                      </button>
                      <button 
                        className="leave-btn"
                        onClick={(e) => handleLeaveCommunity(community.id, e)}
                      >
                        Leave
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="join-community-btn"
                      onClick={(e) => handleJoinCommunity(community.id, e)}
                    >
                      Join
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No communities found matching your criteria.</p>
              <Link to="/" className="create-link">Create a New Community</Link>
            </div>
          )}
        </div>

        {selectedCommunity && (
          <div className="community-details-panel">
            <div className="details-header">
              <h2>{selectedCommunity.name}</h2>
              <button 
                className="close-details"
                onClick={() => setSelectedCommunity(null)}
              >
                ×
              </button>
            </div>
            <div className="details-content">
              <div className="details-section">
                <h3>About this Community</h3>
                <p>{selectedCommunity.description}</p>
              </div>
              <div className="details-section">
                <h3>Community Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">{selectedCommunity.members_count}</span>
                    <span className="stat-label">Members</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{new Date(selectedCommunity.createdAt).toLocaleDateString()}</span>
                    <span className="stat-label">Created</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{selectedCommunity.created_by}</span>
                    <span className="stat-label">Creator</span>
                  </div>
                </div>
              </div>
              <div className="join-action">
                {userJoinedCommunities.some(c => c.id === selectedCommunity.id) ? (
                  <>
                    <div className="member-status">You are a member of this community</div>
                    <button 
                      className="view-posts-btn large"
                      onClick={(e) => navigateToCommunity(selectedCommunity.id, e)}
                    >
                      Visit Community
                    </button>
                    <button 
                      className="leave-community-btn"
                      onClick={(e) => handleLeaveCommunity(selectedCommunity.id, e)}
                    >
                      Leave Community
                    </button>
                  </>
                ) : (
                  <button 
                    className="join-community-btn large"
                    onClick={(e) => handleJoinCommunity(selectedCommunity.id, e)}
                  >
                    Join This Community
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;