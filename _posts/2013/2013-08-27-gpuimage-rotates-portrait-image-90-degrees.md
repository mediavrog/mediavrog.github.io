---
layout: post
title: 'GPUImage dreht Portrait-Bild nach Fotografieren mit Kamera<!--:en-->GPUImage rotates an image shot in portrait mode by 90 degrees'
published: true
comments: true
date: 2013-08-27 03:08:09
tags:
    - android
    - app
    - camera
    - gpuimage
    - orientation
    - photo
    - rotation
categories:
    - android
permalink: /blog/2013/08/27/android/gpuimage-rotates-portrait-image-90-degrees
image:
    thumb: device-2013-08-27-104732preview.png
---
The other day I came across a small issue, while using the [Android port of GPUImage][1]. On some devices (mainly Samsung), an image captured in portrait by the camera intent and then fed to GPUImageView would be rotated by 90 degrees. On other devices, this would work perfectly. Also, selecting an already captured image from the gallery worked just fine.
  



  
  
  
    Despite being captured in portrait mode, the resulting image will be rotated when loaded in GPUImageView
  


I first noticed that the problematic devices were all setting the device orientation to landscape when opening up the camera mode. There were a few noticeable rotations during the process of capturing and reviewing an image. I thought they would somehow write wrong Exif data into the image, but I soon was proved wrong.

The real issue lied within my way of loading the image to GPUImageView:

I grabbed the Uri, once the user supplied a picture via camera, gallery or share with my app function in my `onActivityResult` method:

[...]
case R.string.choose_photo:
case R.string.take_photo:
case R.string.share:
	if (resultCode == RESULT_OK) {
		final Uri uri;
		switch (requestCode) {
			case R.string.take_photo:
				// same as I configured via intent.putExtra(MediaStore.EXTRA_OUTPUT, mTempFileUri); in the photo intent
				uri = mTempFileUri;
				break;
			case R.string.share:
				uri = data.getParcelableExtra(Intent.EXTRA_STREAM);
				break;
			default:
				// some fixes for url-encoded paths like DropBox returns; and paths without "file://" scheme
				uri = Utils.extractProperFileUri(data.getData());
				break;
		}
		// now feed the image to GPUImageView
		mGPUImageView.setImage(uri);
	}
[...]


Setting the image by passing an Uri object, leads to this internal flow in GPUImage:

  1. delegate loading to GPUImage, which will start a `LoadImageUriTask`
  2. the above task will either load the image from web (uri starts with http or https) or using a [ContentResolver][2]
  3. then, it will determine a proper size and **rotation** for the image, using a media query to `MediaStore.Images.ImageColumns.ORIENTATION`
  4. .. and finally return the image resized and rotated to be displayed within the GPUImageView (involves calls to setRenderer and so forth)

The problem lies within step 3, if the given Uri&#8217;s scheme is not `content` but `file`. Media queries work on proper content Uris, so Android can look into the meta data associated with the image from a [media collection][3]. On the other side, when passing an Uri with a `file`-scheme, the ContentResolver will find no additional meta data for a &#8222;generic file&#8220; which resides on a given path. To get ahold of any additional image information, one should use the [ExifInterface][4] and read the `ExifInterface.TAG_ORIENTATION` from the file.

Fortunately, after a quick digging into the GPUImage code, I found that the method `mGPUImageView.setImage();` actually supports various types of parameters and then uses slightly different ways to load and interpret them:

// load the image directly from bitmap data
setImage(Bitmap bmp);

// load a file from the file system, interpreting exif data for proper rotation
setImage(File file);

// load a file from the internet or media store, using media query for proper rotation
setImage(Uri uri);


Since I also passed an Uri object when I referenced a file, GPUImage could not determine the proper rotation in the -non existing- media store data. Eventually, fixing this was as easy as that:

[...]
// now feed the image to GPUImageView
// either by File or other ContentResolver
// important for correct usage of detecting image rotation (File: ExifInterface; ContentResolver: MediaStore > ImageColumns)
if ("file".equals(uri.getScheme())) {
	mGPUImageView.setImage(new File(uri.getPath()));
} else {
	mGPUImageView.setImage(uri);
}



  
  
  
    Providing GPUImageView with the proper parameters in setImage() leads to correct rotation
  


I hope it helps someone facing the same issues. It is not specifically related to GPUImage, but to capturing an photo with Android and processing it in general, as you can see at [stackoverflow][5]. GPUImage employs best practices to load an image properly, if provided with the correct parameters.

Big thanks to [CyberAgent][6] and [pboos][7] for proding us with that port of the [original GPUImage library for iOS][8].

 [1]: https://github.com/CyberAgent/android-gpuimage
 [2]: http://developer.android.com/reference/android/content/ContentResolver.html
 [3]: http://developer.android.com/reference/android/provider/MediaStore.html
 [4]: http://developer.android.com/reference/android/media/ExifInterface.html
 [5]: http://stackoverflow.com/search?q=android+portrait+camera+90
 [6]: https://github.com/CyberAgent
 [7]: https://github.com/pboos
 [8]: https://github.com/BradLarson/GPUImage