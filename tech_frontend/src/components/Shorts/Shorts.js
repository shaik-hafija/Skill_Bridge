import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './shorts.css';
import axios from 'axios';

const Shorts = () => {
    const [videoData, setVideoData] = useState([]);
    const [reactions, setReactions] = useState([]);
    const [descriptionVisible, setDescriptionVisible] = useState([]);
    const [commentVisible, setCommentVisible] = useState([]);

    useEffect(() => {
        // Fetch video data from the backend
        const fetchVideoData = async () => {
            try {
                const response = await axios.get('/videos'); // Adjust the endpoint according to your API
                console.log(response);
                
                setVideoData(response.data); // Directly access response.data from Axios
                setReactions(response.data.map(() => ({ liked: false, disliked: false })));
                setDescriptionVisible(response.data.map(() => false));
                setCommentVisible(response.data.map(() => false));
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
            {videoData.map((videoProfile, index) => (
                <div key={index} className="video-card">
                    {/* If the user has multiple videos, map through them */}
                    {videoProfile.src.map((videoSrc, vidIndex) => (
                        <div key={vidIndex} className="single-video">
                            <video controls>
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}

                    <div className="interaction">
                        <button>
                            <FontAwesomeIcon icon={faUserCircle} />
                        </button>
                        <button
                            onClick={() => handleReaction(index, 'liked')}
                            disabled={reactions[index].liked}
                        >
                            <FontAwesomeIcon icon={faThumbsUp} />
                            <p className="ptag">{reactions[index].liked ? 1 : 0}</p>
                        </button>
                        <button
                            onClick={() => handleReaction(index, 'disliked')}
                            disabled={reactions[index].disliked}
                        >
                            <FontAwesomeIcon icon={faThumbsDown} />
                            <p className="ptag">{reactions[index].disliked ? 1 : 0}</p>
                        </button>
                        <button onClick={() => toggleComment(index)}>
                            <FontAwesomeIcon icon={faComment} />
                        </button>
                    </div>

                    {descriptionVisible[index] && <p className="video-description">{videoProfile.description}</p>}
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

export default Shorts;
