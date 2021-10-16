from capstone.models import User, Roles, Years, LeaveDimension, Holidays, MyFreeDays, MyStatus
from django.contrib import admin


class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username","role")

class RoleAdmin(admin.ModelAdmin):
    list_display = ("id", "role_name")

class YearAdmin(admin.ModelAdmin):
    list_display = ("id", "year","description")    

class LeaveDimensionAdmin(admin.ModelAdmin):
    list_display = ("id", "year","user","dimension")    

class HolidaysAdmin(admin.ModelAdmin):
    list_display = ("id", "day_str","day_date")    

class MyFreeDaysAdmin(admin.ModelAdmin):
    list_display = ("id", "day_str","day_date", "user")    

class StatusAdmin(admin.ModelAdmin):
    list_display = ("id", "user","year", "status", "info")    

admin.site.register(User,UserAdmin)
admin.site.register(Roles, RoleAdmin)
admin.site.register(Years, YearAdmin)
admin.site.register(LeaveDimension, LeaveDimensionAdmin)
admin.site.register(Holidays, HolidaysAdmin)
admin.site.register(MyFreeDays, MyFreeDaysAdmin)
admin.site.register(MyStatus, StatusAdmin)