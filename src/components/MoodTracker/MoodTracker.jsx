import { useState } from "react";
import InputEmoji from "react-input-emoji";

const moodEmojis = {
  1: '😫', // Very bad
  2: '🙁', // Bad
  3: '😐', // Neutral
  4: '🙂', // Good
  5: '😁', // Very good
};

const MoodTracker = () => {
    const [moodEmoji, setMoodEmoji] = useState('');
    const [moodRating, setMoodRating] = useState(3);
    const handleOnEnter =(emoji) => {
        setMoodEmoji(emoji);
        setMoodRating(Object.keys(moodEmojis).find(key => moodRating[key] === emoji))
    }
    const handleSubmit = () => {
        console.log('Mood:', moodRating); 
    }
    return <section>
        <h2>How are you feeling today</h2>
            {Object.keys(moodEmojis).map((rating) => ( 
                <span 
                    key={rating}
                    className={`mood-emoji ${rating === moodRating ? 'selected' : ''}`}
                    onClick={() => setMoodRating(rating)} 
                >
                    {moodEmojis[rating]}
                </span>
            ))}
            <InputEmoji 
            value={moodEmoji} 
            onChange={setMoodEmoji} 
            onEnter={handleOnEnter} 
            cleanOnEnter 
            placeholder="How are you feeling today"
            />
            <button onClick={handleSubmit}>Submit</button>
    </section>
}

export default MoodTracker;