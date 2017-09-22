class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?
  around_action :set_time_zone
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :username, :profile_photo])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :username, :profile_photo])
  end

  def set_time_zone
    return yield unless (utc_offset = cookies['browser.tzoffset']).present?
    utc_offset = utc_offset.to_i
    gmt_offset = if utc_offset == 0 then nil elsif utc_offset > 0 then -utc_offset else "+#{-utc_offset}" end
    Time.use_zone("Etc/GMT#{gmt_offset}"){ yield }
  rescue ArgumentError
    yield
  end
end
