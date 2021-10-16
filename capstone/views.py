from typing import Match
from django.shortcuts import render
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import JsonResponse
import json
import datetime


from .models import User, Roles, Years, LeaveDimension, Holidays, MyFreeDays, MyStatus
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
def index(request):

    firstTime()


    return render(request, "capstone/index.html")
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
def firstTime():
    try:
        roles= Roles.objects.filter(role_name="employee")
        print("in try")
        print(roles)

    except:
        print("exception")

    if not roles:    
        role = Roles(role_name="employee")
        role.save()
        role = Roles(role_name="manager")
        role.save()
        role = Roles(role_name="admin")
        role.save()

   




# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "capstone/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "capstone/login.html")

# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        first_name = request.POST["firstname"]
        last_name = request.POST["lastname"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "capstone/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()

        except IntegrityError:
            return render(request, "capstone/register.html", {
                "message": "Username already taken."
            })

        try:
            result = Years.objects.get(description="current_year")
            current_year = result.year
                
        except:
            current_year = 2021
        
        leave_dimienison = LeaveDimension(year=current_year,user=user,dimension=26)    
        leave_dimienison.save()


        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "capstone/register.html")
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def module(request):
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    curentUserRole = curentUser.role.role_name
    if request.method == "GET":
        if 'leaveManagerBtn' in request.GET and curentUserRole == "manager":
            return render(request, "capstone/leavemanager.html")
        elif 'settingsBtn' in request.GET and curentUserRole == "admin":
            return render(request, "capstone/adminmanager.html")
        elif 'leavePlannerBtn' in request.GET and (curentUserRole == "employee" or curentUserRole == "manager" or curentUserRole == "admin"):
            return render(request, "capstone/leaveplanner.html")
        else:
            error_message="You do not have enough permissions to access this function."
        return render(request, "capstone/index.html",{
             "error_message": error_message

         })    
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def getEmployeessCount(request):
    #print("get employes count")
    users_per_page = 10
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    curentUserRole = curentUser.role.role_name
    allUsers = []
    pages_count = 0
    if curentUserRole == "admin" or curentUserRole == "manager":
        all_users = User.objects.all()
        paginator = Paginator(all_users, users_per_page) 
        pages_count = paginator.num_pages
    
    return JsonResponse({"pages_count": pages_count}, status=201)
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
class Person:
    def __init__(self,id,name,surname,role,dimension):
        self.id = id
        self.surname_name = surname+" "+name
        self.role = role
        self.dimension = dimension
    def serialize(self):
        return {
            "id": self.id,
            "surname_name": self.surname_name,
            "role": self.role.role_name,
            "dimension":self.dimension
           
        }

# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def saveCredentials(request):
    #print("save credentials")
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    curentUserRole = curentUser.role.role_name
    
    if curentUserRole == "admin":
        if (request.method == "PUT"):
            data = json.loads(request.body)
            id_user = data["id"]
            credentials = data["credentials"]
            user = User.objects.get(id=id_user)
            rola =  user.role
            if(credentials == "admin"):
                rola = Roles.objects.get(role_name="admin")
            elif(credentials == "manager"):
                rola = Roles.objects.get(role_name="manager")
            else:        
                rola = Roles.objects.get(role_name="employee")

            user.role = rola
            user.save()
            year = data["year"]
            dimension = data["dimension"]
            dimm = LeaveDimension.objects.filter(year=year,user=user).first()
            dimm.dimension = dimension
            dimm.save()

            return JsonResponse({"message": "user updated successfully."}, status=201)


# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------

@csrf_exempt
@login_required
def getEmployeessPage(request,page_number):
    #print("get employes page no "+str(page_number))
    if (request.method == "PUT"):
        #print("jest put")
        data = json.loads(request.body)
        year = data["year"]

    users_per_page = 10
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    curentUserRole = curentUser.role.role_name
    allUsers = []
    pages_count = 0
    if curentUserRole == "admin":
        all_users = User.objects.all()
        all_users = all_users.order_by('last_name','first_name').all()
        paginator = Paginator(all_users, users_per_page)
        pages_count = paginator.count
        page_obj = paginator.get_page(page_number)
  
        result = paginator.page(page_number).object_list

        



        result_to_return =[]
        for emp in result:
            
            dimm_value = 20 
            try:
               
                dimm = LeaveDimension.objects.filter(year=year,user=emp).first()
               
                #print(dimm)
                
                #print("name="+dimm.user.username)
                #print("try")
                dimm_value = dimm.dimension
                #print("try2")
            except:
                #print("catch")
                dimm = LeaveDimension(year=year,user=emp,dimension = 25)
                dimm.save()
                dimm_value = dimm.dimension
                #print("name2="+dimm.user.username)

            
            result_to_return.append(Person(emp.id,emp.first_name,emp.last_name,emp.role,dimm_value))

    
    return JsonResponse([emp1.serialize() for emp1 in result_to_return] , safe=False)



# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def saveYear(request):
    #print("save year")
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    curentUserRole = curentUser.role.role_name
    
    if curentUserRole == "admin":
        if (request.method == "PUT"):
            data = json.loads(request.body)
            year = data["year"]
            try:
                result = Years.objects.get(description="current_year")
                result.year=year
                result.save()
            except:
                rok = Years(year=year,description="current_year")
                rok.save() 

            return JsonResponse({"message": "year updated successfully."}, status=201)


# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def getYear(request):
       #print("get year")
       year = 2021
       try:
            result = Years.objects.get(description="current_year")
            year = result.year  
       except:
            result = 2021
            #print("exception occurs")
          

       
       #print(year)
       return JsonResponse({"year": year}, status=201) 

# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def getHolidays(request,year_number):
    #print("get free days in year "+str(year_number))
    result_set = Holidays.objects.filter(day_str__startswith=year_number).order_by('day_date').all()

    #return JsonResponse({"holidays": result_set}, status=201) 
    return JsonResponse([data.serialize() for data in result_set] , safe=False)



# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def saveHoliday(request):
    #print("save free days in year ")
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    curentUserRole = curentUser.role.role_name
    
    if curentUserRole == "admin":
        if (request.method == "PUT"):
            data = json.loads(request.body)
            date_date = data["date_date"]
            date_str = data["date_str"]
            if_delete = data["if_delete"]
            if(if_delete):
                #print("deleting")
                oldHoliday = Holidays.objects.filter(day_str=date_str)
                oldHoliday.delete()



            else:
                newHoliday = Holidays(day_str=date_str, day_date=date_date)
                try:           
                #if (True):
                    newHoliday.save()
                    #----------------------------------------------------------
                    # -- delete from free days planned already
                    freeDays = MyFreeDays.objects.filter( day_str=date_str ).all()
                    if freeDays:
                       #print('was planned by somebody that day')
                       users_to_modify_status =[]
                       for d in freeDays:
                            users_to_modify_status.append(d.user)

                       freeDays = MyFreeDays.objects.filter( day_str=date_str ).delete()

                       for d in users_to_modify_status:
                           #print("modyfiing plan status")
                           year = int(date_str[0:4])
                           #print(year)
                           #print(d)

                           newStatus = MyStatus.objects.filter(user=d,year=year)
                           #print("a")
                           #print(newStatus)
                           #print("b")
                           if newStatus:
                               for k in newStatus:
                                    k.status = "planning"
                                    k.info = "please fill"
                                    #print("before save")
                                    k.save()


                    #----------------------------------------------------------

                except:
                    print("exception")    

        return JsonResponse({"message": "operation successfull."}, status=201)



# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def saveMyFreeDays(request):
    #print("saving free days")
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    #print(curentUser)
    
    
    if (request.method == "PUT"):
        data = json.loads(request.body)
        freeDays = data["free_days"]
        year = data["year"]
        #print(year)
        #print(freeDays)
        #if (freeDays):
            #strr = freeDays[0]
            #year = strr[0:4]
        myOldFreeDays = MyFreeDays.objects.filter( day_str__startswith=year,user = curentUser ).all()
        #print(myOldFreeDays)
        myOldFreeDays.delete()
        #print("kasujemy")
        for day in freeDays:
            #print (day)
            tab = day.split('-')
            dd = datetime.datetime(int(tab[0]), int(tab[1]), int(tab[2]))
            date = dd.date()
            
            #print("dzien1="+day)
            #print("dzien2=")
            #print(date)
            #print("current user= ")
            #print(curentUser)

            newFreeDay = MyFreeDays(user=curentUser, day_str=day,day_date=date)
            #print(newFreeDay)
            #print("przed try")
            try:
                newFreeDay.save()
                #print('saving day')
                #print(newFreeDay)
            except:
                print("day already saved")

    return JsonResponse({"message": "operation successfull."}, status=201)

# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def getMyFreeDays(request,year_number):
    #print("getting my saved free days i jear" +str(year_number))
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    mySavedFreeDays = MyFreeDays.objects.filter( day_str__startswith=year_number,user = curentUser ).all()
    #for i in mySavedFreeDays:
        #print(i.day_str)  

    return JsonResponse([data.serialize() for data in mySavedFreeDays] , safe=False)
  
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def getMyDimension(request,year_number):
    #print("getting my dimension in jear" +str(year_number))
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)

    dimm = LeaveDimension.objects.filter(year=year_number,user=curentUser).first()
    if not dimm:
        dimm = LeaveDimension(year=year_number,user=curentUser,dimension = 26)
        dimm.save()


    return JsonResponse({"dimension": dimm.dimension}, status=201)


# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def myStatus(request):
    #print("about status")
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    #print(curentUser)

    if (request.method == "PUT"):
        data = json.loads(request.body)
        to_update = data["to_update"]
        year = data["year"]
        status = data["status"]
        info = data["info"]

        savedStatus = MyStatus.objects.filter(user=curentUser).first() 
        if not savedStatus:
            newStatus = MyStatus(user=curentUser,year=year,status=status,info=info)
            newStatus.save()
            savedStatus = newStatus

        if(to_update):
            #print("updating status")
            savedStatus.status = status
            savedStatus.info = info
            savedStatus.save()



        #else:
            #print("getting status")
            #print(savedStatus)
        
        return JsonResponse({"saved_status": savedStatus.serialize()}, status=201)




    #return JsonResponse({"saved_status": savedStatus}, status=201)

# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
class PersonForManager:
    def __init__(self,id,name,surname,free_days,status):
        self.id = id
        self.surname_name = surname+" "+name
        self.free_days = free_days
        self.status = status
    def serialize(self):
        return {
            "id": self.id,
            "surname_name": self.surname_name,
            "status": self.status.status,
            "free_days":[day.day_str for day in self.free_days]
           
        }
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------


@csrf_exempt
@login_required
def getEmployeessPage2(request,page_number):
    #print("get employes2 page no "+str(page_number))
    if (request.method == "PUT"):
        #print("jest put")
        data = json.loads(request.body)
        year = data["year"]

    users_per_page = 10
    nameCurrentUser = request.user.username
    curentUser = User.objects.get(username=nameCurrentUser)
    curentUserRole = curentUser.role.role_name
    allUsers = []
    pages_count = 0
    if curentUserRole == "manager":
        all_users = User.objects.all()
        all_users = all_users.order_by('last_name','first_name').all()
        paginator = Paginator(all_users, users_per_page)
        pages_count = paginator.count
        page_obj = paginator.get_page(page_number)
  
        result = paginator.page(page_number).object_list

        result_to_return =[]
        for emp in result:
            
            dimm_value = 20 
            try:
               
                friidays = MyFreeDays.objects.filter(day_str__startswith=year,user=emp).all()
                #print("emp:")
                #print(emp.username)
                #print("and his freedays")
                #print(friidays)
                savedStatus = MyStatus.objects.filter(user=emp).first() 
                if not savedStatus:
                    status ="planning"
                    info="please fill"
                    newStatus = MyStatus(user=emp,year=year,status=status,info=info)
                    newStatus.save()
                    savedStatus = newStatus

                #print("and his status")    
                #print(savedStatus)
                #print("name="+dimm.user.username)
                #print("try")
                #dimm_value = dimm.dimension
                #print("try2")
                #pperrssoonn = PersonForManager()
                result_to_return.append(PersonForManager(emp.id,emp.first_name,emp.last_name,friidays,savedStatus))
            except:
                print("catch error")
                #dimm = LeaveDimension(year=year,user=emp,dimension = 25)
                #dimm.save()
                #dimm_value = dimm.dimension
                #print("name2="+dimm.user.username)

            
            

    
    return JsonResponse([emp1.serialize() for emp1 in result_to_return] , safe=False)
    #return JsonResponse({"message": "operation successfull."}, status=201)






# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
@csrf_exempt
@login_required
def itStatus(request):
    #print("about status")
    
   
    

    if (request.method == "PUT"):
        data = json.loads(request.body)
        to_update = data["to_update"]
        year = data["year"]
        status = data["status"]
        info = data["info"]
        idUser = data["person_id"]
        curentUser = User.objects.get(id=idUser)
        #print(curentUser)

        savedStatus = MyStatus.objects.filter(user=curentUser).first() 
        if not savedStatus:
            newStatus = MyStatus(user=curentUser,year=year,status=status,info=info)
            newStatus.save()
            savedStatus = newStatus

        if(to_update):
            #print("updating status")
            savedStatus.status = status
            savedStatus.info = info
            savedStatus.save()



        #else:
            #print("getting status")
            #print(savedStatus)
        
        return JsonResponse({"saved_status": savedStatus.serialize()}, status=201)




    #return JsonResponse({"saved_status": savedStatus}, status=201)

# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
class Dateavg:
    def __init__(self,str_date,count):
        self.str_date = str_date
        self.count = count
       
    def serialize(self):
        return {
            "str_date": self.str_date,
            "count": self.count
           
        }
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------
# ---------------------------------------------------------------------




@csrf_exempt
@login_required
def getEmployeessPage2AvgAbsence(request):
    #print("get employes2avgabsence ")
    if (request.method == "PUT"):
        #print("jest put")
        data = json.loads(request.body)
        year = data["year"]

   
        nameCurrentUser = request.user.username
        curentUser = User.objects.get(username=nameCurrentUser)
        curentUserRole = curentUser.role.role_name
        usersCounter = User.objects.all().count()
        allUsers = []
        table_of_dates_and_avg =[]

        if curentUserRole == "manager":
            #print("counting for "+str(usersCounter))
            dat = datetime.datetime(year,1,1)
            y = dat.year
            
            counter = 0
            while ( y ==year ):
                #print("in while loop")
                
                m = dat.month
                d =  dat.day
                str_date = str(y)+"-"+str(m)+"-"+str(d) 
                friidays = 0
                try:
                    friidays = MyFreeDays.objects.filter(day_str= str_date).count()
                except:
                    friidays = 0  
                average_temp = round(friidays/usersCounter,2)
                averagr =  Dateavg(str_date,average_temp)
                #print(" i= "+str(counter)+" day="+str_date+" freedays="+str(friidays)+" avg="+str(average_temp))
                table_of_dates_and_avg.append(averagr)
                
                dat+=datetime.timedelta(days=1)
                y = dat.year
                counter=counter+1
            
            #print("counter")
            #print(counter)
            #for k in table_of_dates_and_avg:        
            #    print(k.str_date)
            
            

    
    return JsonResponse([dane.serialize() for dane in table_of_dates_and_avg] , safe=False)
    #return JsonResponse({"message": "operation successfull."}, status=201)




  