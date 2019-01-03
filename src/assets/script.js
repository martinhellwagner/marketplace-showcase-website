export default {
  mounted() {
    const container = document.querySelector('.container');

    // Smoothly fade in content after all images are loaded
    this.onImagesLoaded(container, () => {
      container.classList.add('container--ready');
    });

    // Event listeners
    window.addEventListener('orientationchange', () => {
      window.location.reload();
    });
  },

  methods: {
    // Check if images are loaded
    onImagesLoaded(container, event) {
      const images = container.getElementsByTagName('img');
      let loaded = images.length;

      for (let i = 0; i < images.length; i += 1) {
        if (images[i].complete) {
          loaded -= 1;
        } else {
          // eslint-disable-next-line
          images[i].addEventListener('load', () => {
            loaded -= 1;
            if (loaded === 0) {
              event();
            }
          });
        }
        if (loaded === 0) {
          event();
        }
      }
    },
  },
};
