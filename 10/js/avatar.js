const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

//добавление аватара

const fileChooser = document.querySelector('.ad-form__field input[type=file]');
const preview = document.querySelector('.image_avatar');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});


//добавление изображение жилья

const fileFormChooser = document.querySelector('.ad-form__upload input[type=file]');
const previewForm = document.querySelector('.ad-form__photo > img');

fileFormChooser.addEventListener('change', () => {
  const file = fileFormChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewForm.src = URL.createObjectURL(file);
  }
});
