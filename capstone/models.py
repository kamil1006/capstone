from django.contrib.auth.models import AbstractUser
from django.db import models


class Roles(models.Model):
   role_name = models.CharField(max_length=25,default="employee")

class User(AbstractUser):
    pass
    role =  models.ForeignKey(Roles, on_delete=models.DO_NOTHING, related_name="role1",default=1, null = True, blank=True)

class Years(models.Model):
   year = models.IntegerField(default=2022)
   description = models.CharField(max_length=25,default="not_current_year")

class LeaveDimension(models.Model):
   year = models.IntegerField(default=2021)
   user =  models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="user_a")
   dimension = models.IntegerField(default=26)
   class Meta:
        unique_together = ('year', 'user')

class Holidays(models.Model):   
    day_str = models.CharField(max_length=25, unique=True)
    day_date = models.DateTimeField(default=None)
    def serialize(self):
        return {
            "id": self.id,
            "day_str": self.day_str,
            "day_date": self.day_date
            
        }
    
class MyFreeDays(models.Model):   
    user =  models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="user_b")
    day_str = models.CharField(max_length=25)
    day_date = models.DateTimeField(default=None) 
    class Meta:
        unique_together = ('user', 'day_str')  

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "day_str": self.day_str,
            "day_date": self.day_date
            
        } 

class MyStatus(models.Model):   
   user =  models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="user_c")
   year = models.IntegerField(default=2022)
   status = models.CharField(max_length=25,default="planning")
   info = models.CharField(max_length=255,default="please fill")
   
   class Meta:
        unique_together = ('user', 'year')  

   def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "status": self.status,
            "info": self.info
            
        } 