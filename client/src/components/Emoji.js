import React from 'react';
import Picker from 'emoji-picker-react';

export default function Emoji(props) {

    const onEmojiClick = (event, emojiObject) => {
        props.handleEmoji(emojiObject.emoji)
    };

    return (
        <div style={{position: 'absolute', zIndex: '1'}}>
            <Picker onEmojiClick={onEmojiClick} />
        </div>
    );
}
