<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    use RequestFormatter;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->sendApiRequestFormat(200, Company::all(), 'Companies fetched successfully');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $fields = [
            'company_name' => 'required|unique:companies|min:3|max:15',
            'company_logo' => 'required|image|max:2048',
            'company_phone' => 'required|unique:companies|min:10',
            'company_address' => 'required|unique:companies|min:3',
            'company_domain' => 'required|min:3',
        ];

        $company_validation = Validator::make($request->all(), $fields);

        if($company_validation->fails()) return $this->sendApiRequestFormat(401, null, $company_validation->errors());

        $company = new Company();
        $company->company_name = $request->company_name;
        $company->company_logo = $request->file('company_logo')->storeAs('iamges/companies', time().$request->company_name);
        $company->company_phone = $request->company_phone;
        $company->company_address = $request->company_address;
        $company->company_domain = $request->company_domain;

        if(!Company::create($company)) return $this->sendApiRequestFormat(500, null, 'Company creation failed.');

        return $this->sendApiRequestFormat(200, null, 'Company cteated successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $company = Company::find($id);
        if(!$company) return $this->sendApiRequestFormat(404, null, 'Company not found.');

        $fields = [
            'company_name' => 'required|unique:companies|min:3|max:15',
            'company_logo' => 'required|image|max:2048',
            'company_phone' => 'required|unique:companies|min:10',
            'company_address' => 'required|unique:companies|min:3',
            'company_domain' => 'required|min:3',
        ];

        $company_validation = Validator::make($request->all(), $fields);

        if($company_validation->fails()) return $this->sendApiRequestFormat(401, null, $company_validation->errors());

        $company->company_name = $request->company_name;
        $company->company_logo = $request->file('company_logo')->storeAs('iamges/companies', time().$request->company_name);
        $company->company_phone = $request->company_phone;
        $company->company_address = $request->company_address;
        $company->company_domain = $request->company_domain;

        if(!$company->save()) return $this->sendApiRequestFormat(500, null, 'Company update failed.');

        return $this->sendApiRequestFormat(200, null, 'Company updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Company::find($id);
        if(!$company) return $this->sendApiRequestFormat(404, null, 'Company not found.');
        if(!Company::destroy($company)) return $this->sendApiRequestFormat(500, null, 'Company delete failed.');
        return $this->sendApiRequestFormat(200, null, 'Company deleted successfully.');
    }
}
