import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';

const EditEntry = () => {
    const { id } = useParams();
    const [entry, setEntry] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:2000/getentrybyid/${id}`)
            .then(response => {
                setEntry(response.data.entry);
                setTitle(response.data.entry.title);
                setContent(response.data.entry.content);
                setPreview(response.data.entry.imagepath ? `http://localhost:2000/uploads/${response.data.entry.imagepath}` : '');
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [id]);


    const handleEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('myfile', image);
        }
        else{
            formData.append('imagepath',entry.imagepath);
        }

        try {
            await axios.put(`http://localhost:2000/updateEntry/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Entry updated successfully');
            // Redirect to the appropriate route after successful update
        } catch (error) {
            console.error('Error updating entry: ', error);
            alert('Failed to update entry');
        }
    };

    const handleImageChange = (e) => {
        // setImage(e.target.files[0]); --no need to write
        const file = e.target.files[0];
        // setImage({ ...image, myfile: file });
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div style={{backgroundImage:`url('/edit1.jpeg')`,backgroundSize:"cover", backgroundRepeat: 'no-repeat',height:735,width:1440}}>
            <br/><br/>
            <Link to='/show'><button  className='editbackbutton'>Back</button></Link>
            <form onSubmit={handleEdit}>
                <input type="text" value={title} className='titlebox' onChange={(e) => setTitle(e.target.value)} />
                <input type="submit" className='update' value="Update" /><br /><br/>
                <textarea value={content} className='contentbox' onChange={(e) => setContent(e.target.value)} /><br />
                <input type="file" onChange={handleImageChange} /><br />
                {preview && <img src={preview} alt="Preview" style={{ width: '200px', height: '200px' }} />}<br />
            </form>
        </div>
    );
};

export default EditEntry;
