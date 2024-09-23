class ImagesController < ApplicationController
  before_action :set_image, only: %i[ show edit update destroy ]

  # GET /images or /images.json
  def index
    if params[:theme_id].present?
      @images = Image.where(theme_id: params[:theme_id])
    else
      @images = Image.all
    end
    render json: @images
  end

  # GET /images/1 or /images/1.json
  def show
    if params[:id] == "this-will-trigger-a-500"
      # Render a 500 to demonstrate how the front-end handles server side errors
      render json: {error: "Internal server error"}, status: 500
    elsif params[:id] == "this-will-trigger-a-401"
      # Render a 401 to demonstrate how the front-end handles server side errors
      render json: {error: "Not authenticated"}, status: 401
    else
      @image = Image.find(params[:id])
      render json: @image
    end
  end

  # GET /images/new
  def new
    @image = Image.new
  end

  # GET /images/1/edit
  def edit
  end

  # POST /images or /images.json
  def create
    @image = Image.new(image_params)

    respond_to do |format|
      if @image.save
        format.html { redirect_to image_url(@image), notice: "Image was successfully created." }
        format.json { render :show, status: :created, location: @image }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /images/1 or /images/1.json
  def update
    respond_to do |format|
      if @image.update(image_params)
        format.html { redirect_to image_url(@image), notice: "Image was successfully updated." }
        format.json { render :show, status: :ok, location: @image }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /images/1 or /images/1.json
  def destroy
    @image.destroy!

    respond_to do |format|
      format.html { redirect_to images_url, notice: "Image was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def image_params
      params.require(:image).permit(:name, :file, :ave_value, :theme_id)
    end
end
