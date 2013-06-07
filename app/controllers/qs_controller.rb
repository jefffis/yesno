require 'uri'

class QsController < ApplicationController
  # GET /qs
  # GET /qs.json
  def index

    if params[:pop]
      @qs = Q.paginate(:page => params[:page]).order('votes_totes DESC').all
    elsif params[:yes]
      @qs = Q.paginate(:page => params[:page]).order('id DESC').all( :select => "*", :conditions => ["votes > votes_no"])
    elsif params[:no]
      @qs = Q.paginate(:page => params[:page]).order('id DESC').all( :select => "*", :conditions => ["votes < votes_no"])
    else
      #@qs = Q.all
      @qs = Q.paginate(:page => params[:page]).order('id DESC').all
    end

    @q_next = Q.offset(rand(Q.count)).first

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @qs }
    end
  end

  # GET /qs/1
  # GET /qs/1.json
  def show
    @q = Q.find_by_unique_id(params[:id])

    @q_next = Q.offset(rand(Q.count)).first

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @q }
    end
  end

  # GET /qs/new
  # GET /qs/new.json
  def new
    @q = Q.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @q }
    end
  end

  # GET /qs/1/edit
  def edit
    @q = Q.find_by_unique_id(params[:id])
  end

  # POST /qs
  # POST /qs.json
  def create
    @q = Q.new(params[:q])

    respond_to do |format|
      if @q.save
        format.html { redirect_to @q, notice: 'Q was successfully created.' }
        format.json { render json: @q, status: :created, location: @q }
      else
        format.html { render action: "new" }
        format.json { render json: @q.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /qs/1
  # PUT /qs/1.json
  def update
    @q = Q.find_by_unique_id(params[:id])

    respond_to do |format|
      if @q.update_attributes(params[:q])
        format.html { redirect_to @q, notice: 'Q was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @q.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /qs/1
  # DELETE /qs/1.json
  def destroy
    @q = Q.find_by_unique_id(params[:id])
    @q.destroy

    respond_to do |format|
      format.html { redirect_to qs_url }
      format.json { head :no_content }
    end
  end
end
