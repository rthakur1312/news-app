import React, { useState } from "react";
import { Box, Slide, Fade, InputBase } from "@mui/material";
import {  Typography, Grid, Button } from '@mui/material';


function Navigation({handleSearchValue, searchValue, updateSelectedSections}) {
    const [isVisible, setIsVisible] = useState(false);

    const handleButtonClick = () => {
        setIsVisible(!isVisible);
    };

    const onSearch = (event) => {
        handleSearchValue(event.target.value);
    }

    const handleSearchClick = () => {
        updateSelectedSections(searchValue)
        handleSearchValue('');
    }
    return (
        <Box>
            <Box
                sx={{
                    float: 'right',
                    marginRight: '2rem',
                    zIndex: 999,
                    position: 'relative',
                    '& svg': {
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            cursor: 'pointer'
                        },
                    },
                }}
                onClick={handleButtonClick}
            >
                {!isVisible ? 
                <svg width="35" height="35" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg" role="img"><title>search icon</title><circle cx="19.5" cy="19.5" r="19" stroke="#3B3E3F"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9358 22.1667H23.7917L29.1975 27.5833L27.5833 29.1975L22.1667 23.7917V22.9358L21.8742 22.6325C20.6392 23.6942 19.0358 24.3333 17.2917 24.3333C13.4025 24.3333 10.25 21.1808 10.25 17.2917C10.25 13.4025 13.4025 10.25 17.2917 10.25C21.1808 10.25 24.3333 13.4025 24.3333 17.2917C24.3333 19.0358 23.6942 20.6392 22.6325 21.8742L22.9358 22.1667ZM12.4161 17.2915C12.4161 19.989 14.5936 22.1665 17.2911 22.1665C19.9886 22.1665 22.1661 19.989 22.1661 17.2915C22.1661 14.594 19.9886 12.4165 17.2911 12.4165C14.5936 12.4165 12.4161 14.594 12.4161 17.2915Z" fill="#3B3E3F" transform-origin="19.723750114440918px 19.723750114440918px"></path><path d="M23.7917 22.1667L23.9686 21.9901C23.9217 21.9431 23.8581 21.9167 23.7917 21.9167V22.1667ZM22.9358 22.1667L22.7623 22.3466C22.8089 22.3916 22.8711 22.4167 22.9358 22.4167V22.1667ZM29.1975 27.5833L29.3743 27.7601C29.4718 27.6625 29.4719 27.5044 29.3745 27.4067L29.1975 27.5833ZM27.5833 29.1975L27.4067 29.3745C27.5044 29.4719 27.6625 29.4718 27.7601 29.3743L27.5833 29.1975ZM22.1667 23.7917H21.9167C21.9167 23.8581 21.9431 23.9217 21.9901 23.9686L22.1667 23.7917ZM22.1667 22.9358H22.4167C22.4167 22.8711 22.3916 22.8089 22.3466 22.7623L22.1667 22.9358ZM21.8742 22.6325L22.0541 22.459C21.9621 22.3636 21.8117 22.3565 21.7112 22.4429L21.8742 22.6325ZM22.6325 21.8742L22.4429 21.7112C22.3565 21.8117 22.3636 21.9621 22.459 22.0541L22.6325 21.8742ZM23.7917 21.9167H22.9358V22.4167H23.7917V21.9167ZM29.3745 27.4067L23.9686 21.9901L23.6147 22.3433L29.0205 27.7599L29.3745 27.4067ZM27.7601 29.3743L29.3743 27.7601L29.0207 27.4066L27.4066 29.0207L27.7601 29.3743ZM21.9901 23.9686L27.4067 29.3745L27.7599 29.0205L22.3433 23.6147L21.9901 23.9686ZM21.9167 22.9358V23.7917H22.4167V22.9358H21.9167ZM21.6942 22.806L21.9867 23.1094L22.3466 22.7623L22.0541 22.459L21.6942 22.806ZM17.2917 24.5833C19.098 24.5833 20.7586 23.9212 22.0371 22.8221L21.7112 22.4429C20.5197 23.4671 18.9737 24.0833 17.2917 24.0833V24.5833ZM10 17.2917C10 21.3189 13.2644 24.5833 17.2917 24.5833V24.0833C13.5406 24.0833 10.5 21.0428 10.5 17.2917H10ZM17.2917 10C13.2644 10 10 13.2644 10 17.2917H10.5C10.5 13.5406 13.5406 10.5 17.2917 10.5V10ZM24.5833 17.2917C24.5833 13.2644 21.3189 10 17.2917 10V10.5C21.0428 10.5 24.0833 13.5406 24.0833 17.2917H24.5833ZM22.8221 22.0371C23.9212 20.7586 24.5833 19.098 24.5833 17.2917H24.0833C24.0833 18.9737 23.4671 20.5197 22.4429 21.7112L22.8221 22.0371ZM23.1094 21.9867L22.806 21.6942L22.459 22.0541L22.7623 22.3466L23.1094 21.9867ZM17.2911 21.9165C14.7317 21.9165 12.6661 19.851 12.6661 17.2915H12.1661C12.1661 20.1271 14.4556 22.4165 17.2911 22.4165V21.9165ZM21.9161 17.2915C21.9161 19.851 19.8506 21.9165 17.2911 21.9165V22.4165C20.1267 22.4165 22.4161 20.1271 22.4161 17.2915H21.9161ZM17.2911 12.6665C19.8506 12.6665 21.9161 14.7321 21.9161 17.2915H22.4161C22.4161 14.456 20.1267 12.1665 17.2911 12.1665V12.6665ZM12.6661 17.2915C12.6661 14.7321 14.7317 12.6665 17.2911 12.6665V12.1665C14.4556 12.1665 12.1661 14.456 12.1661 17.2915H12.6661Z" fill="white" transform-origin="19.72374439239502px 19.72374439239502px"></path></svg>
                : 
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="17.5" cy="17.5" r="17.0513" stroke="#3B3E3F" stroke-width="0.897436"></circle><path d="M23.4492 11.461L11.4609 23.4492M23.4492 23.4492L11.4609 11.461" stroke="#3B3E3F" stroke-width="1.79487" stroke-linecap="round" transform-origin="17.455049991607666px 17.455100059509277px"></path></svg>
}
            </Box>
            <Slide
                direction="down"
                in={isVisible}
                mountOnEnter
                unmountOnExit
                timeout={500}
            >
                <Box
                    sx={{
                        position: "fixed",
                        top: "20px",
                        transform: "translateX(-50%)",
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "5px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 99,
                        textAlign: 'center',
                        width: '100%'
                    }}
                >
                       <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px 0' }}>
          Looking for something specific?
        </Typography>
                    
                    <Fade in={isVisible} timeout={500}>
                 
                        <InputBase
                            sx={{
                                width: "200px",
                                borderBottom: '1px solid #000',
                                maxWidth: '540px',
                                padding: '2px',
                            }}
                            placeholder="Search here"
                            onChange={onSearch}
                            value={searchValue}
                        />
                    </Fade>
                    <Box sx={{display:'inline-block', marginTop: '3rem', position:'relative',
                    '& svg': {
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            fill: 'blue',
                            cursor: 'pointer'
                        },
                    },}} onClick={handleSearchClick}>
                    <svg style={{position:'absolute', top:'-15px'}} width="22" height="22" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg" class="fill-gray-8 hover:cursor-purple-hand-hover-click hover:fill-purple-2 peer-focus:fill-purple-2"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.9358 15.1667H16.7917L22.1975 20.5833L20.5833 22.1975L15.1667 16.7917V15.9358L14.8742 15.6325C13.6392 16.6942 12.0358 17.3333 10.2917 17.3333C6.4025 17.3333 3.25 14.1808 3.25 10.2917C3.25 6.4025 6.4025 3.25 10.2917 3.25C14.1808 3.25 17.3333 6.4025 17.3333 10.2917C17.3333 12.0358 16.6942 13.6392 15.6325 14.8742L15.9358 15.1667ZM5.41614 10.2915C5.41614 12.989 7.59364 15.1665 10.2911 15.1665C12.9886 15.1665 15.1661 12.989 15.1661 10.2915C15.1661 7.59403 12.9886 5.41653 10.2911 5.41653C7.59364 5.41653 5.41614 7.59403 5.41614 10.2915Z"></path></svg>
                    </Box>
                </Box>
            </Slide>
        </Box>
    )
}

export default Navigation;