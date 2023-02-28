class CoursesController < ApplicationController
  def show
    @course = course
    @sections = course.sections.includes(:lessons)

    if current_user.present?
      set_lesson_completion_status
    end
  end

  private

  def course
    path.courses.friendly.find(params[:id])
  end

  def path
    Path.find(params[:path_id])
  end

  def set_lesson_completion_status
    lesson_completions = current_user.lesson_completions.where(course_id: @course.id).ids

    @sections.map(&:lessons).flatten.each do |lesson|
      p lesson
      lesson.completed = lesson_completions.include?(lesson.id)
    end
  end
end
