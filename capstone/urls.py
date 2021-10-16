"""capstone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("module", views.module, name="module"),
    path("employeesscount", views.getEmployeessCount, name="employeesscount"),
    path("employeesAM/<int:page_number>", views.getEmployeessPage, name="employeesAM"),
    path("savecredentials", views.saveCredentials, name="save_credentials"),
    path("saveyear", views.saveYear, name="save_year"),
    path("getcurrentyear", views.getYear, name="get_year"),
    path("holidays/<int:year_number>", views.getHolidays, name="holidays"),
    path("saveholiday", views.saveHoliday, name="save_holiday"),
    path("savemyfreedays", views.saveMyFreeDays, name="save_freedays"),
    path("getmyfreedays/<int:year_number>", views.getMyFreeDays, name="get_freedays"),
    path("getmydimension/<int:year_number>", views.getMyDimension, name="get_dimension"),
    path("mystatus", views.myStatus, name="my_statuss"),
    path("employeesMM/<int:page_number>", views.getEmployeessPage2, name="employeesMM"),
    path("employeesMMavg", views.getEmployeessPage2AvgAbsence, name="employeesMMavg"),
    path("itstatus", views.itStatus, name="it_status"),
]
