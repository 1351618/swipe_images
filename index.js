const changingImagesCardImages = document.querySelector(
  ".changing-images-card__images"
);
const changingImagesCardImagesImg = document.querySelector(
  ".changing-images-card__images_img"
);
const changingImagesCardImagesControl = document.querySelector(
  ".changing-images-card__images_control"
);

const images = [
  {
    title: "img 1",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt2beEOGc-e7gg6oLPEuh0Bax5F2NpxCvcCQ&usqp=CAU",
    alt: "Image 1",
  },
  {
    title: "img 1",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgBpQ5cXzDOfHIrMNMdo8fYqzoVW8KYRZLzg&usqp=CAU",
    alt: "Image 2",
  },
  {
    title: "img 1",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtyJG6GrU7urAUdTt5q3TCKuAKhT7cxc-_QA&usqp=CAU",
    alt: "Image 3",
  },
  {
    title: "img 1",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs8zXsVgJm1tRwcywo-sWWtyYbzjG4MX_fdA&usqp=CAU",
    alt: "Image 3",
  },
];

images.forEach((image, index) => {
  const imgElement = document.createElement("img");
  imgElement.src = image.url;
  imgElement.alt = image.alt;
  imgElement.title = image.title;
  if (index === 0) {
    imgElement.classList.add("img-active");
  }
  changingImagesCardImagesImg.appendChild(imgElement);
});

const imagesCount = images.length;
let currentIndex = 0;

// Функция переключения изображения
const switchImage = (index) => {
  if (index < 0 || index >= imagesCount) {
    return;
  }

  // Убираем класс "active" у всех кнопок
  const dots = document.querySelectorAll(
    ".changing-images-card__images_control button"
  );
  dots.forEach((d) => d.classList.remove("btn-active"));

  // Добавляем класс "active" к нажатой кнопке
  dots[index].classList.add("btn-active");

  // Убираем класс "active" у всех картинок
  const imgs = document.querySelectorAll(
    ".changing-images-card__images_img img"
  );
  imgs.forEach((img) => img.classList.remove("img-active"));

  // Добавляем класс "active" к соответствующей картинке
  imgs[index].classList.add("img-active");
};

// Создаем элементы для отображения точек
for (let i = 0; i < images.length; i++) {
  const dot = document.createElement("button");
  dot.textContent = "●";
  if (i === 0) {
    dot.classList.add("btn-active");
  }

  // Обработчик нажатия
  dot.addEventListener("click", () => {
    switchImage(i);
  });

  // Обработчик наведения
  dot.addEventListener("mouseover", () => {
    switchImage(i);
  });

  changingImagesCardImagesControl.appendChild(dot);
}

// Добавляем обработчики для свайпа
let touchStartX = 0;
let touchEndX = 0;

changingImagesCardImages.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

changingImagesCardImages.addEventListener("touchmove", (e) => {
  touchEndX = e.touches[0].clientX;
});

changingImagesCardImages.addEventListener("touchend", () => {
  if (touchStartX - touchEndX > 50) {
    // Свайп влево
    currentIndex = (currentIndex + 1) % imagesCount;
    switchImage(currentIndex);
  }

  if (touchEndX - touchStartX > 50) {
    // Свайп вправо
    currentIndex = (currentIndex - 1 + imagesCount) % imagesCount;
    switchImage(currentIndex);
  }
});
