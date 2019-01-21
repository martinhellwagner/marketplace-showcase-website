export default {
  mounted() {
    const container = document.querySelector('.container');
    const imageWrappers = container.querySelectorAll('.image-wrapper');

    this.checkImagesLoaded(container, () => {
      container.classList.add('container--ready');
    });

    window.addEventListener('orientationchange', () => {
      window.location.reload();
    });

    for (let i = 0; i < imageWrappers.length; i += 1) {
      imageWrappers[i].addEventListener('mouseover', () => {
        this.toggleImages(imageWrappers[i].querySelector('.image--first'));
      });

      imageWrappers[i].addEventListener('mouseout', () => {
        this.toggleImages(imageWrappers[i].querySelector('.image--first'));
      });

      imageWrappers[i].addEventListener('touchstart', (event) => {
        event.preventDefault();
        this.toggleImages(imageWrappers[i].querySelector('.image--first'));
      });
    }
  },

  methods: {
    toggleImages(image) {
      if (image.classList.contains('image--hidden')) {
        image.classList.remove('image--hidden');
      } else {
        image.classList.add('image--hidden');
      }
    },

    // Check if images are loaded
    checkImagesLoaded(container, loaded) {
      const images = container.getElementsByTagName('img');
      let imagesToLoad = images.length;

      for (let i = 0; i < images.length; i += 1) {
        if (images[i].complete) {
          imagesToLoad -= 1;
        } else {
          // eslint-disable-next-line
          images[i].addEventListener('load', () => {
            imagesToLoad -= 1;
            if (imagesToLoad === 0) {
              loaded();
            }
          });
        }
        if (imagesToLoad === 0) {
          loaded();
        }
      }
    },
  },
};
