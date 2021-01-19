@component('mail::message')
{{ __('passwords.reset-password_t') }}

{{ __('passwords.reset-message', ['name' => $data ? $data['employee'] ? $data['employee']->employee_username ?? '' : '' : '']) }}.

@component('mail::button', ['url' => $data ? $data['url'] ?? '' : '', 'color' => 'success'])
{{ __('passwords.reset-password') }}
@endcomponent

{{ __('messages.thanks') }},<br>
{{ config('app.name') }}
@endcomponent
