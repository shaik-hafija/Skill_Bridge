import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Video_Shorts.css';
import axios from 'axios';

const Video_Shorts = () => {
    const [videoData, setVideoData] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [descriptionVisible, setDescriptionVisible] = useState([]);
    const [commentVisible, setCommentVisible] = useState([]);

    useEffect(() => {
        // Fetch video data from the backend
        const fetchVideoData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get_videos');
                const videos = response.data; // This should be an array of video file names

                setVideoData(videos);
                setReactions(videos.map(() => ({ liked: false, disliked: false })));
                setDescriptionVisible(videos.map(() => false));
                setCommentVisible(videos.map(() => false));
            } catch (error) {
                console.error('Error fetching video data:', error);
            }
        };

        fetchVideoData();
    }, []);

    const handleReaction = (index, reactionType) => {
        setReactions((prevReactions) => {
            const newReactions = [...prevReactions];
            if (!newReactions[index][reactionType]) {
                newReactions[index][reactionType] = true;
                newReactions[index][reactionType === 'liked' ? 'disliked' : 'liked'] = false;
            }
            return newReactions;
        });
    };

    const toggleDescription = (index) => {
        setDescriptionVisible((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    const toggleComment = (index) => {
        setCommentVisible((prevVisibility) => {
            const newVisibility = [...prevVisibility];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    return (
        <div className="videos-container">
            {videoData.map((videoFileName, index) => (
                <div key={index} className="video-card">
                    <div className="single-video">
                        <video 
                            key={index} 
                            controls 
                            src={`http://localhost:5000/uploads/${videoFileName}`} 
                            style={{ width: '400px', margin: '10px', height: 'auto' }}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className="interaction">
                        <button>
                            <FontAwesomeIcon icon={faUserCircle} />
                        </button>
                        <button
                            onClick={() => handleReaction(index, 'liked')}
                            disabled={reactions[index]?.liked}
                        >
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <p className="ptag">{reactions[index]?.liked ? 1 : 0}</p>
                        </button>
                        <button
                            onClick={() => handleReaction(index, 'disliked')}
                            disabled={reactions[index]?.disliked}
                        >
                            <FontAwesomeIcon icon={faThumbsDown} />
                            <p className="ptag">{reactions[index]?.disliked ? 1 : 0}</p>
                        </button>
                        <button onClick={() => toggleComment(index)}>
                            <FontAwesomeIcon icon={faComment} />
                        </button>
                    </div>

                    {descriptionVisible[index] && <p className="video-description">Video description here</p>}
                    {commentVisible[index] && (
                        <div className="comment-section">
                            <textarea placeholder="Write a comment..." className="comment-input"></textarea>
                            <button className="submit-comment">Submit</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Video_Shorts;
