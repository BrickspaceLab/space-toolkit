export const products = {

  // Update page when variant selection changes
  handleProductFormChange(
    newVariant: string,
    source: number,
    sectionId: number,
    productHandle: string,
    productUrl: string,
    sellingPlanGroupId: number = 0,
    sellingPlanId: number = 0,
    enableDefault: boolean = true
  ) {
    if(!newVariant) return;

    // Parse incoming variant
    const selectedVariant = JSON.parse(decodeURIComponent(newVariant));

    if(selectedVariant !== null) {
      // Refesh the options with section rendering API
      this.fetchAndUpdateOptions(sectionId, productHandle, selectedVariant.id, productUrl);

      if(enableDefault) {
        // Set option variables base on selectedVariant
        this.setVariantOptions(selectedVariant);
      }

      // Update display values based on selectedVariant
      this.setDefaultsFromSelectedVariant(selectedVariant, sellingPlanGroupId, sellingPlanId);

      // Update all_options_selected if all options are selected
      this.setallOptionsSelected();

      // Update order of product gallery based on new selections
      this.reorderProductGallery();

      // Refresh pickup availability block
      this.fetchAndRefreshPickup(selectedVariant.id);

      // Add variant id to URL parameters
      this.updateUrlParameters();

      // Update calculated price with quantity
      this.calculated_price = this.quantity * this.current_variant_price;
    } else if(productUrl) {
      // refresh product page
      this.fetchAndRefreshProduct(productUrl, sectionId);
    } else {
      // handle unavailable variant

    // set all_options_selected to true
    this.all_options_selected = true;
    // set current_variant_exists to false
    this.current_variant_exists = false;
    }
  },
  
  fetchAndUpdateOptions(sectionId: string, productHandle: string, variantId: string, productUrl: string) {
    const oldProductUrl = (document.querySelector('.js-product') as HTMLElement)?.dataset.productUrl;
    const newProductUrl = productUrl;

    if(newProductUrl && oldProductUrl !== newProductUrl) {
      this.fetchAndRefreshProduct(productUrl, sectionId, variantId);
    } else {
      this.product_loading = true;
      // Regular product (reload the options only)
      // Call the section rendering api 
      fetch(`${window.Shopify.routes.root}products/${productHandle}?section_id=${sectionId}&variant=${variantId}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');
        const optionsElement = document.querySelector(`.options-${sectionId}`);
        optionsElement?.parentNode?.insertBefore(html.querySelector(`.options-${sectionId}`), optionsElement)
        optionsElement?.remove();
        this.product_loading = false;
      });
    }
   
  },

  async fetchAndRefreshProduct(productUrl: string, sectionId: string, variantId?: string) {

    const oldProductUrl = (document.querySelector('.js-product') as HTMLElement)?.dataset.productUrl;
    const newProductUrl = productUrl;
          // Combined listing (reload the whole pdp)
      // load product section with Section Render API
      try {
        const response = await fetch(
          `${productUrl}?section_id=${sectionId}&variant=${variantId}`
        );
  
        // If response is not OK, throw an error
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Catpure data from fetch
        const responseHtml = await response.text();
        const html = new DOMParser().parseFromString(responseHtml, 'text/html');
  
        // inject new html
        const oldSection = document.querySelector('.js-product')
        if(oldSection) {
          const newSection = html.querySelector('.js-product');
          oldSection.parentNode!.insertBefore(newSection!, oldSection);
          oldSection.remove();
        }
      } 
  
      catch (error) {
        console.error(error);
      }
  },

  // Update options to match the selected variant
  setVariantOptions(selectedVariant: any) {
    if (selectedVariant) {
      const optionsSize = this.product_options.length;
      selectedVariant.options.forEach((option: string, index: number) => {
        this[`option${index + 1}`] = this.encodeToBase64(option);
      })
    }
  },

  // Update values based on selected variant
  setDefaultsFromSelectedVariant(
    selectedVariant: any,
    sellingPlanGroupId: number,
    sellingPlanId: number
  ) {
    // Get product form container
    let formContainer = this.$refs.formContainer;

    // If variant exists
    if (selectedVariant) {
      // Update basics
      this.current_variant_available = selectedVariant.available;
      this.current_variant_exists = true;
      this.current_variant_id = selectedVariant.id;
      this.current_variant_price = selectedVariant.price;
      this.current_variant_compare_price = selectedVariant.compare_at_price;
      this.current_variant_sku = selectedVariant.sku;
      this.current_variant_title = selectedVariant.title;

      // If a matching variant is found, update current_variant_inventory_quantity
      if (selectedVariant) {
        this.current_variant_inventory_quantity = selectedVariant.inventory_quantity;
        this.current_variant_inventory_policy = selectedVariant.inventory_policy;
        this.current_variant_inventory_management = selectedVariant.inventory_management;
      }

      // Set featured image id if available
      this.current_variant_featured_image_id = selectedVariant.featured_image ? selectedVariant.featured_image.id : null;
      this.current_variant_featured_media_id = selectedVariant.featured_media ? selectedVariant.featured_media.id : null;

      // Update unit price
      if (selectedVariant.unit_price) {
        this.current_variant_unit_price = selectedVariant.unit_price;
        this.current_variant_unit_label = selectedVariant.unit_price_measurement.reference_unit;
      }

      // Set selling plan to true if allocations are available
      this.current_variant_has_selling_plan = Array.isArray(selectedVariant.selling_plan_allocations) && selectedVariant.selling_plan_allocations.length > 0;
      if (this.current_variant_has_selling_plan && this.enable_selling_plan_widget) {

        // Update if variant requires plan
        this.current_variant_requires_selling_plan = selectedVariant.requires_selling_plan;

        // Set array of available groups
        this.current_variant_selling_group_ids = selectedVariant.selling_plan_allocations.map(allocation => allocation.selling_plan_group_id);
        this.current_variant_selling_group_ids.push('0');

        this.current_variant_selling_group_id = sellingPlanGroupId;
        if (sellingPlanId) {
          this.current_variant_selling_plan_id = sellingPlanId;
        }

        // Check if allocation exists with matching group and plan
        let matchingAllocation = selectedVariant.selling_plan_allocations.find(
          allocation => allocation.selling_plan_group_id === this.current_variant_selling_group_id &&
            allocation.selling_plan_id === parseInt(this.current_variant_selling_plan_id)
        );

        // Set values to first plan if matching allocation not found
        if (!matchingAllocation) {
          const firstAllocationInGroup = selectedVariant.selling_plan_allocations.find(
            allocation => allocation.selling_plan_group_id === this.current_variant_selling_group_id
          );
          if (firstAllocationInGroup) {
            matchingAllocation = firstAllocationInGroup;
            this.current_variant_selling_plan_id = firstAllocationInGroup.selling_plan_id;
          }
        }
        // Update prices to matchingAllocation
        if (matchingAllocation && sellingPlanGroupId !== 0) {
          this.defaultSellingPlanPrice = matchingAllocation.per_delivery_price;
          this.current_variant_price = matchingAllocation.per_delivery_price;
          this.current_variant_compare_price = matchingAllocation.compare_at_price;
          this.current_variant_unit_price = matchingAllocation.unit_price;
        }


        // Update defaults and summary from selling plan data
        if (this.current_variant_selling_plan_id !== 0) {

          // Update plan basics
          let sellingPlanInput = formContainer.querySelector('.js-' + this.current_variant_selling_plan_id);

          // INFO: Using third-party widget won't update price display on page
          if(sellingPlanInput) {
            let sellingPlanData = JSON.parse(sellingPlanInput.getAttribute('data-selling-plan'));
            this.current_variant_selling_plan_name = sellingPlanData.name.trim() + '.';
            this.current_variant_selling_plan_description = sellingPlanData.description.trim();

            // Update plan savings from price adjustment array
            let savingSummary = '';
            let savingHighlight = '';
            sellingPlanData.price_adjustments.forEach((price_adjustment, index, array) => {
              let savingValue = price_adjustment.value;
              if (savingValue <= 0) return;
              let savingsPercentLabel = '';
              let savingsCount = price_adjustment.order_count || 'ongoing';
              let punctuation = index === (array.length - 1) ? '. ' : '';
              let sentenceStart = 'Save ';
              switch (price_adjustment.value_type) {
                case 'percentage':
                  savingsPercentLabel = '%';
                  break;
                case 'price':
                  savingValue = Shopify.formatMoney(sellingPlanData.compare_at_price - savingValue);
                  sentenceStart = '';
                  savingHighlight = `Save ${savingValue}${savingsPercentLabel}`;
                  break;
                case 'fixed_amount':
                  savingValue = Shopify.formatMoney(savingValue);
                  break;
              }

              savingSummary += `${sentenceStart}${savingValue}${savingsPercentLabel} for ${savingsCount} orders${punctuation}`;
              if (index === 0) {
                savingHighlight = `Save ${savingValue}${savingsPercentLabel}`;
              }
            });

            this.current_variant_selling_plan_savings_description = savingSummary;
            this.current_variant_selling_plan_savings_summary = savingHighlight;
          }
        }

        // If no group selected reset plan selection
        if (this.current_variant_selling_group_id == "0") {
          this.current_variant_selling_plan_id = 0;
        }

      }
    }

    // If variant does not exist
    else {
      this.current_variant_exists = false;
    }

  },

  // Update all_options_selected if all options are selected
  setallOptionsSelected() {
    let optionsSize = this.product_options.length;
    this.all_options_selected =
      (optionsSize === 1 && this.option1) ||
      (optionsSize === 2 && this.option1 && this.option2) ||
      (optionsSize === 3 && this.option1 && this.option2 && this.option3);

    if (this.current_variant_has_only_default_variant === true) {
      this.all_options_selected = true;
    }
  },

  // Update order of product gallery images
  reorderProductGallery() {
    let formContainer = this.$refs.formContainer;

    // Check if enable_variant_images is enabled - this checks if store is using "Only show media associated with the selected variant"
    // If so we scroll to start of slider
    if (this.enable_variant_images) {
      setTimeout(() => {
        this.galleryScrollToStart(0);
      }, 100);
    }

    // If store is not using enable_variant_images
    // Scroll to first featured image
    else {
      const featuredImage = formContainer.querySelectorAll('.js-' + this.current_variant_featured_media_id);
      const featuredImageGrid = formContainer.querySelectorAll('.js-' + this.current_variant_featured_media_id + '-grid');

      if (featuredImage.length > 0) {
        // Slide to image
        const slideIndex = featuredImage[0].getAttribute('data-slide');
        if (slideIndex) {
          this.galleryScrollToIndex(parseInt(slideIndex));
        }

        // Reorder grid
        if(featuredImageGrid.length > 0) {
          const parentElement = featuredImageGrid[0].parentNode;
          if (parentElement) {
            parentElement.insertBefore(featuredImageGrid[0], parentElement.firstChild);
          }
        }
      }
    }

  },

  // Add variant id to URL parameters
  // URL will only update if on a product page and all options are selected
  updateUrlParameters() {
    if (window.location.pathname.includes('/products/') && this.all_options_selected) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('variant', this.current_variant_id);
      const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      history.replaceState(null, '', newRelativePathQuery);
    }
  },

  // Refresh pickup availability block
  async fetchAndRefreshPickup(
    variantId: number
  ) {

    // TODO: Write universal fetchAndRender function
    const updatePickupContainer = async (containerSelector: string, url: string) => {
      const formContainer = this.$refs.formContainer;
      if (!formContainer) return;

      const containerElement = formContainer.querySelector(containerSelector);
      if (!containerElement) return;

      try {
        const response = await fetch(url);
        if (response.status === 200) {
          const html = document.createElement('div'); html.innerHTML = await response.text();
          const htmlCleaned = html.querySelector(containerSelector);
          if (htmlCleaned) {
            this.current_variant_pickup_available = htmlCleaned.hasAttribute('data-pickup-available');
            containerElement.innerHTML = htmlCleaned.innerHTML;
          } else {
            this.current_variant_pickup_available = false;
            containerElement.innerHTML = '';
          }
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    await updatePickupContainer('.js-pickupButton', `${window.location.pathname}?section_id=product__pickup-button&variant=${variantId}`);
    await updatePickupContainer('.js-pickupDrawer', `${window.location.pathname}?section_id=product__pickup-drawer&variant=${variantId}`);

  },

  // Scroll to next gallery item
  galleryScrollNext () {

    // Unzoom the gallery
    this.galleryResetZoom();
    
    // Set the next index
    this.gallery_next = this.gallery_index + 1;
    if (this.gallery_next > this.gallery_size){
      this.gallery_next = 0;
    }

    // Go to new slide
    this.galleryScrollToIndex(this.gallery_next);

  },

  // Scroll to previous gallery item
  galleryScrollBack () {

    // Unzoom the gallery
    this.galleryResetZoom();
    
    // Set the next index
    if (!this.gallery_next) {
      this.gallery_next = 0;
    }
    this.gallery_next = this.gallery_next - 1;
    if (this.gallery_next < 0){
      this.gallery_next = this.gallery_size;
    }

    // Go to new slide
    this.galleryScrollToIndex(this.gallery_next);

  },
  
  // Scroll to a specific gallery item
  galleryScrollToIndex(
    index: number
  ) {

    // Unzoom the gallery
    this.galleryResetZoom();

    // Get product form container
    let formContainer = this.$refs.formContainer;

    // Get sliders
    let slider = formContainer.querySelector('.js-slider');
    let thumbnailSlider = formContainer.querySelector('.js-thumbnailSlider');
    let zoomSlider = formContainer.querySelector('.js-zoomSlider');

    // Go to slide
    let currentSlide = slider.querySelector('[data-slide="' + index + '"]');
    if (currentSlide) {
      let currentSlidePosition = currentSlide.offsetLeft;
      slider.scrollTo({
        top: 0,
        left: currentSlidePosition,
        behavior: 'smooth'
      });
    }

    // Go to slide on thumbnail
    if (thumbnailSlider) {
      let currentThumb = thumbnailSlider.querySelector('[data-slide="' + index + '"]');
      if (currentThumb) {
        let currentThumbPosition = currentThumb.offsetTop;
        thumbnailSlider.scrollTo({
          top: currentThumbPosition - 200,
          left: 0,
          behavior: 'smooth'
        });
      }
    }

    // Go to slide on fullscreen gallery
    setTimeout(() => {
      if (zoomSlider){
        let currentSlide = zoomSlider.querySelector('[data-slide="' + index +'"]');
        let currentSlidePosition = currentSlide.offsetTop;
        if (currentSlide) {
          zoomSlider.scrollTo({
            top: currentSlidePosition,
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    }, 100);

    // Update index
    // this.gallery_index = index;
  },

  // Scroll to start of gallery slider
  galleryScrollToStart() {

    // Unzoom the gallery
    this.galleryResetZoom();

    // Get product form container
    let formContainer = this.$refs.formContainer;

    // Get sliders
    let slider = formContainer.querySelector('.js-slider');
    let thumbnailSlider = formContainer.querySelector('.js-thumbnailSlider');

    // Go to slide
    slider.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    // Go to slide on thumbnail
    if (thumbnailSlider) {
      thumbnailSlider.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

    // Update index
    this.gallery_index = 0;
  },

  // Unzoom all images
  galleryResetZoom() {
    for (let i = 0; i < this.gallery_size; i++) {
      this['gallery_zoom_' + i] = false;
    }
  },

  // Zoom in on gallery image
  galleryZoomIn() {
    this['gallery_zoom_' + this.gallery_index] = true;
    this.zoomed = true;
  },

  // Zoom out of gallery image
  galleryZoomOut() {
    this['gallery_zoom_' + this.gallery_index] = false;
    this.zoomed = false;
  }

};