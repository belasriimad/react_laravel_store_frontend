import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';

export default function ProductImages({product}) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        hanldeProductImages();
    }, []);
    
    const hanldeProductImages = () => {
        let updatedImages = [{
            original: product.thumbnail,
            thumbnail: product.thumbnail,
        }];

        if(product.first_image) {
            updatedImages = [
                ...updatedImages, {
                    original: product.first_image,
                    thumbnail: product.first_image,
                }
            ]
        }

        if(product.second_image) {
            updatedImages = [
                ...updatedImages, {
                    original: product.second_image,
                    thumbnail: product.second_image,
                }
            ]
        }

        if(product.third_image) {
            updatedImages = [
                ...updatedImages, {
                    original: product.third_image,
                    thumbnail: product.third_image,
                }
            ]
        }

        setImages(updatedImages);
    }

    return (
        <ImageGallery items={images} />
    )
}
