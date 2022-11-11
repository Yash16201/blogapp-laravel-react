<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BLogDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try{
            $blog_fetch = Blog::where('user_id', '=', $request['id'])->where('status','=','1')->with('detail')->get();
            return $blog_fetch;
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while fetching!!'
            ],500);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        Request()->validate([
            'title'=>'required',
            'description'=>'required',
            'visiblefrom'=>'required',
            'visibleto'=>'required'
        ]);

        try{
            $blog = new Blog;
            $blog->blog_title = $request['title'];
            $blog->user_id = $request['id'];
            
            if($blog->save()){
                $lastid = $blog->id;
                $details = new BlogDetail;
                $details->blog_id = $lastid;
                $details->post_text = $request['description'];
                $file= $request->file('image');
                if(isset($file))
                {
                    $filename= date('YmdHi').$file->getClientOriginalName();
                    $details->blog_attachment_1 = $filename;
                    $file-> move(public_path('public/Image'), $filename);
                }
                $details->visible_from = $request['visiblefrom'];
                $details->visible_to = $request['visibleto'];
                $details->timestamps = false;
                $details->save();
                return response()->json([
                    'message'=>'Blog Created'    
                ]);
            }
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while inserting!!'
            ],500);
        }
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        try{
            $blog_fetch = Blog::where('user_id', '=', $request['id'])->where('id','=',$request['blog'])->where('status','=','1')->with('detail')->get();
            return $blog_fetch;
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while fetching!!'
            ],500);
        }
        
    }

    public function searchlive(Request $request){
        try{
            $blog_fetch = Blog::where('user_id', '=', $request['id'])->where('blog_title','LIKE','%'.$request['name'].'%')->where('status','=','1')->with('detail')->get();
            return $blog_fetch;
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while fetching!!'
            ],500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function edit(Blog $blog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        Request()->validate([
            'title'=>'required',
            'description'=>'required',
            'visiblefrom'=>'required',
            'visibleto'=>'required'
        ]);
        try{
            $blog = Blog::where('user_id', '=', $request['id'])->where('id','=',$request['blog'])->where('status','=','1')->firstOrFail();
            $file= $request->file('image');
            if($blog){
                if(isset($file))
                {
                    $filename= date('YmdHi').$file->getClientOriginalName();
                    $blog_update = Blog::where('id','=',$request['blog'])->where('user_id', '=', $request['id'])->where('status','=','1')->update(['blog_title'=> $request['title']]);
                    if($blog_update){
                        $blogdet_update = BlogDetail::where('blog_id','=',$request['blog'])->where('status','=','1')->update(['post_text'=> $request['description'] , 'blog_attachment_1' => $filename , 'visible_from' => $request['visiblefrom'] , 'visible_to'=> $request['visibleto']]);
                        $file-> move(public_path('public/Image'), $filename);
                        return response()->json('success');
                    }
                }else{
                    $blog_update = Blog::where('id','=',$request['blog'])->where('user_id', '=', $request['id'])->where('status','=','1')->update(['blog_title'=> $request['title']]);
                    if($blog_update){
                        $blogdet_update = BlogDetail::where('blog_id','=',$request['blog'])->where('status','=','1')->update(['post_text'=> $request['description'] , 'visible_from' => $request['visiblefrom'] , 'visible_to'=> $request['visibleto']]);
                        return response()->json('success');
                    }
                }
            }
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while fetching!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function softdelete(Request $request)
    {
        try {
            $blog_update = Blog::where('id','=',$request['blog'])->where('user_id', '=', $request['id'])->where('status','=','1')->update(['status'=> '0']);
            if($blog_update){
                $blogdet_update = BlogDetail::where('blog_id','=',$request['blog'])->where('status','=','1')->update(['status'=> '0']);
                return response()->json('success');
            }
        } catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while fetching!!'
            ],500);
        }
    }

    
}
