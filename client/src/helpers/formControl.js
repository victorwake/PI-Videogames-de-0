

export const formControl = input => {

    let errText = {}; 

    if (!input.name) errText.name = 'Name is required'
    else if (!/^[^@#$%^&]+$/.test(input.name)) errText.name = 'Name must not contain special characters (@#$%^&)'

    if(!input.description) errText.description = 'Description is required'

    if(!input.genres.length) errText.genres = 'Genres cannot be empty'

    if(!input.released) errText.released = 'Released is required'
    else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)) errText.released = 'Release date must be in the format yyyy-mm-dd"'
    
    if(!input.rating) errText.rating = 'Rating is required'
    else if (input.rating < 0 || input.rating > 5) errText.rating = 'Rating must be a number between 0 and 5';

    if(input.image && !/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) errText.image = "Image URL must have a valid URL format (http/https/ftp)"
    else if (input.image && !/(\.|=)(jpg|png|gif)$/i.test(input.image)) errText.image = "Image URL must have a valid image format (jpg/png/gif)"

    if (!input.platforms.length) errText.platforms = 'Platforms cannot be empty'
    
    return errText;

};
