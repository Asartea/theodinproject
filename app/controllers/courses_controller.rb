class CoursesController < ApplicationController
  def show
    @path = Path.find(params[:path_id])
    @course = @path.courses.friendly.find(params[:id])
    @sections = @course.sections.includes(:lessons)

    mark_completed_lessons
  end

  private

  def mark_completed_lessons
    return if current_user.nil?

    lessons = @sections.flat_map(&:lessons)
    current_user.mark_completed_lessons(lessons)
  end
end
